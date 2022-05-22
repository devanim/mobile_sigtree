using System;
using System.Collections.Generic;
using System.Linq;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Metaform.API.EntitySchemas;
using Microsoft.AspNetCore.Http;
using Metaform.API.Helpers;
using Metaform.API.Helpers.Services;
using Metaform.API.Helpers.Token;
using Metaform.API.Middleware;
using Metaform.API.Repositories;
using Metaform.API.Repositories.RepositoryBase;
using Metaform.API.TenancyModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using NSwag;
using NSwag.AspNetCore;

namespace Metaform.API
{
    public class Startup
    {
        public Startup(IHostEnvironment env)
        {
            if (env != null)
            {
                IConfigurationBuilder builder = new ConfigurationBuilder()
                    .SetBasePath(env.ContentRootPath)
                    .AddJsonFile("appsettings.json", true, true)
                    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true);
                Configuration = Configuration = builder.Build();
            }

            Environment = env;
            Token = Configuration.GetSection("TokenManagement").Get<TokenManagement>();
        }

        public IConfiguration Configuration { get; }
        public IHostEnvironment Environment { get; }
        public static TokenManagement Token { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
            services.AddTransient<IClaimsTransformation, ClaimsTransformer>();
            // ASP.NET HttpContext dependency
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            RegisterAuthentication(services);
            // ASP.NET Authorization Polices
            // Register the Swagger services
            #region openapi
            services.AddOpenApiDocument(document =>
            {
                document.AddSecurity("bearer", Enumerable.Empty<string>(), new OpenApiSecurityScheme
                {
                    Type = OpenApiSecuritySchemeType.OAuth2,
                    Flow = OpenApiOAuth2Flow.Implicit,
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = Token.AuthorizationUrl,
                            TokenUrl = Token.TokenUrl,
                        }

                    }
                });
            });

            services.AddMultitenancy<AppTenant, AppTenantMiddleware>();
            #endregion
            services.AddScoped<IAuthenticateService, TokenAuthenticationService>();
            services.AddScoped<IUserManagementService, UserManagementService>();
            services.Configure<MongoDbSettings>(Configuration.GetSection("MongoDbSettings"));
            services.AddSingleton<IMongoDbSettings>(serviceProvider =>
                serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);
            services.AddTransient<EntitySchemaRepository>(provider =>
            {
                var appTenant = provider.GetService<AppTenant>();
                var settings = provider.GetService<IMongoDbSettings>();

                if (appTenant == null)
                {
                    throw new InvalidOperationException("The tenant id must be present in request");
                }

                var database = string.Format(Configuration["MongoDbSettings:DatabaseName"], appTenant.TenantId);

                return new EntitySchemaRepository(settings, database);

            });
            services.AddTransient(provider =>
            {
                var appTenant = provider.GetService<AppTenant>();
                var settings = provider.GetService<IMongoDbSettings>();

                if (appTenant == null)
                {
                    throw new InvalidOperationException("The tenant id must be present in request");
                }

                var database = string.Format(Configuration["MongoDbSettings:DatabaseName"], appTenant.TenantId);

                return new DictionaryRepository(settings, database);

            });
            services.AddTransient(provider =>
            {
                var appTenant = provider.GetService<AppTenant>();
                var settings = provider.GetService<IMongoDbSettings>();

                if (appTenant == null)
                {
                    throw new InvalidOperationException("The tenant id must be present in request");
                }

                var database = string.Format(Configuration["MongoDbSettings:DatabaseName"], appTenant.TenantId);

                return new DataRepository(settings, database);

            });
            services.AddControllers().AddNewtonsoftJson();
            services.AddHealthChecks()
                    .AddMongoDb(Configuration["DatabaseSettings:ConnectionString"], "MongoDb Health", HealthStatus.Degraded);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseAuthentication();
                app.UseOpenApi();
                app.UseSwaggerUi3(settings =>
                {
                    settings.OAuth2Client = new OAuth2ClientSettings
                    {
                        ClientId = Token.ClientId,
                        ClientSecret = Token.Secret,
                        AppName = Token.AppName,
                        Realm = Token.Realm
                    };

                });
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseHttpsRedirection();
            app.UseMultitenancy<AppTenant>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();                
                endpoints.MapHealthChecks("/hc", new HealthCheckOptions()
                {
                    Predicate = _ => true,
                    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                });
            });
        }

        private void RegisterAuthentication(IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.Authority = Token.Authority;
                o.Audience = Token.Audience;
                o.RequireHttpsMetadata = false;
                o.SaveToken = true;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Token.Secret)),
                    ValidIssuer = Token.Issuer,
                    ValidAudience = Token.Audience,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                o.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = c =>
                    {
                        c.NoResult();
                        c.Response.StatusCode = StatusCodes.Status500InternalServerError;
                        c.Response.ContentType = "text/plain";

                        return c.Response.WriteAsync(Environment.IsDevelopment() ? c.Exception.ToString() : c.Exception.Message);
                    }
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("TenantAdmin", policy => policy.RequireClaim("user_roles", new List<string>() {"TenantAdmin"}));
                options.AddPolicy("TenantUser", policy => policy.RequireClaim("user_roles", new List<string>() {"TenantUser"}));
            });
        }
    }
}
