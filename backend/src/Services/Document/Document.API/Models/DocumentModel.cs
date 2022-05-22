using Microsoft.AspNetCore.Http;

namespace Document.API.Models
{
    public class DocumentModel
    {
        public IFormFile File { get; set; }
        public string FilePath { get; set; }
    }
}
