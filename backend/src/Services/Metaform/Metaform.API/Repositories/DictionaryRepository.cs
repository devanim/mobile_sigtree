using Metaform.API.EntitySchemas;
using Metaform.API.Helpers;
using Metaform.API.Repositories.RepositoryBase;

namespace Metaform.API.Repositories
{
    public class DictionaryRepository: RepositoryBase<Dictionary>
    {
        public DictionaryRepository(IMongoDbSettings settings, string databaseName) : base(settings, databaseName)
        {
        }
    }
}
