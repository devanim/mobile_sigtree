using System.Collections.Generic;

namespace Metaform.API.EntitySchemas
{
    public class Dictionary: Document
    {
        public string Name { get; set; }
        public List<Dictionary<string,string>> Values { get; set; }
    }
}
