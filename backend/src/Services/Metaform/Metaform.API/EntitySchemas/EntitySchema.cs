using System;using System.Collections.Generic;
using Metaform.API.Metadata;

namespace Metaform.API.EntitySchemas
{
    public class EntitySchema : Document
    {
        public string Name { get; set; }
        public EntiySchemaType Type { get; set; }
        public List<Field> Fields { get; set; }
    }
}

