
using System.Collections.Generic;

namespace Metaform.API.Metadata
{
    public class ValidationRule
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Label { get; set; }
        public bool ValidationRequired { get; set; }
        public List<ValidationRule> ValidationRules { get; set; }
    }
}
