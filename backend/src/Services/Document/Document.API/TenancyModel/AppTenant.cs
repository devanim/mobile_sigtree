namespace Document.API.TenancyModel
{
    public class AppTenant
    {
        public AppTenant(string tenantId)
        {
            TenantId = tenantId;
        }

        public string TenantId { get; }
    }
}
