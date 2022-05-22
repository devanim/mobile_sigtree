using Metaform.API.EntitySchemas;
using MongoDB.Driver;

namespace Metaform.API.Data.Interfaces
{
    public interface IMetaformContext
    {
        IMongoCollection<EntitySchema> Entities { get; }
    }
}
