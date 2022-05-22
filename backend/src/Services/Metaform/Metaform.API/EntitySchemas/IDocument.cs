using System;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Metaform.API.EntitySchemas
{
    public interface IDocument
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        DateTime DocCreatedAt { get; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreationDateTime { get; }

        public DateTime LastUpdateDateTime { get; set; }

        public bool Disabled { get; set; }
    }
}