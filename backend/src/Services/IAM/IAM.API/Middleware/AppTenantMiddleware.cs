using System.Linq;
using System.Threading.Tasks;
using IAM.API.TenancyModel;
using Microsoft.AspNetCore.Http;
using SaasKit.Multitenancy;

namespace IAM.API.Middleware
{
    public class AppTenantMiddleware : ITenantResolver<AppTenant>
    {
        public Task<TenantContext<AppTenant>> ResolveAsync(HttpContext context)
        {
            if (context.User != null)
            {
                var tenantId = context.User.Claims.First(c => c.Type == "groups").Value;
                var appTenant = new AppTenant(tenantId);
                var tenantContext = new TenantContext<AppTenant>(appTenant);
                return Task.FromResult(tenantContext);
            }

            return Task.FromResult<TenantContext<AppTenant>>(null);
        }
    }
}
