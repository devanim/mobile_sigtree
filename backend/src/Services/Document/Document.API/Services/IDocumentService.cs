using System.IO;
using System.Threading.Tasks;
using Document.API.Models;

namespace Document.API.Services
{
    public interface IDocumentService
    {
        Task Upload(DocumentModel model);
        Task<byte[]> Get(string name);
        Task<byte[]> FillDocument(string fileName, DataPlainModel model);
    }
}
