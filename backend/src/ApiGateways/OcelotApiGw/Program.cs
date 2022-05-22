using Common.Logging;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Ocelot.DependencyInjection;
using Serilog;

namespace OcelotApiGw
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    var environmentName = GetEnvironment(hostingContext);
                    config.AddJsonFile($"metaform.{environmentName}.json", true, true);
                    config.AddJsonFile($"document.{environmentName}.json", true, true);

                    config.AddOcelot($"./config/{GetEnvironment(hostingContext, true)}/", hostingContext.HostingEnvironment as IWebHostEnvironment);

                })
                .UseSerilog(SeriLogger.Configure)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        private static string GetEnvironment(HostBuilderContext hostBuilderContext, bool isPath = false)
        {
            var envName = hostBuilderContext.HostingEnvironment.EnvironmentName;
            return envName == "Production" && !isPath ? string.Empty : envName;
        }
    }
}
