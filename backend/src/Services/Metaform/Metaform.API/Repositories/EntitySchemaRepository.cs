using Metaform.API.EntitySchemas;
using Metaform.API.Helpers;
using Metaform.API.Repositories.RepositoryBase;

namespace Metaform.API.Repositories
{
    public class EntitySchemaRepository: RepositoryBase<EntitySchema>
    {
        public EntitySchemaRepository(IMongoDbSettings settings, string databaseName) : base(settings, databaseName)
        {
        }
    }
}
