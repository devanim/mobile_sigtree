using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Metaform.API.EntitySchemas
{
    public abstract class Document : IDocument
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTime DocCreatedAt => new ObjectId(Id).CreationTime;
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreationDateTime { get; }
        public DateTime LastUpdateDateTime { get; set; }
        [DefaultValue(false)]
        public bool Disabled { get; set; } = false;
        public string CreatedByUserId { get; set; }
    }
}