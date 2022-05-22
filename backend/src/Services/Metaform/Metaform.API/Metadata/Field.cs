
using System.Collections.Generic;

namespace Metaform.API.Metadata
{
    public class Field
    {
        public string Name { get; set; }
        public FieldTypes Type { get; set; }
        public FieldTypeProps FieldTypeProps { get; set; }
        public DictionaryDetails DictionaryDetails { get; set; }
        public bool HasDictionary { get; set; } = false;
        public string Placeholder { get; set; }
        public string Label { get; set; }
        public bool ValidationRequired { get; set; }
        public List<ValidationRule> ValidationRules { get; set; }
    }

    public class DictionaryDetails
    {
        public string DictionaryId { get; set; }
        public string KeyField { get; set; }
        public string KeyValue { get; set; }
    }
}
