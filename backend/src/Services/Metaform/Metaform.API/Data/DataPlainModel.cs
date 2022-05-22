using Metaform.API.EntitySchemas;
using MongoDB.Bson;

namespace Metaform.API.Data
{
    public class DataPlainModel : Document
    {
        public string Data { get; set; }
        public string Name { get; set; }
    }
}
