using Metaform.API.Data.Interfaces;
using Metaform.API.EntitySchemas;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Metaform.API.Data
{
    public class MetaformContext : IMetaformContext
    {
        public MetaformContext(IConfiguration configuration)
        {            
            var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            var database = client.GetDatabase(configuration.GetValue<string>("DatabaseSettings:DatabaseName"));

            Entities = database.GetCollection<EntitySchema>(configuration.GetValue<string>("DatabaseSettings:CollectionName"));
        }
        public IMongoCollection<EntitySchema> Entities { get; }
    }
}
