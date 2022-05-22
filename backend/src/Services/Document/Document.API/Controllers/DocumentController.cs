using Document.API.Models;
using Document.API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Document.API.Controllers
{
    [ApiController]
    [Route("document")]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        public  DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [Route("upload")]
        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] DocumentModel model)
        {
            if (model.File != null)
            {
                await _documentService.Upload(model);
            }
            return Ok();
        }

        [Route("get")]
        [HttpGet]
        public async Task<IActionResult> Get(string fileName)
        {
            var bytes = await _documentService.Get(fileName);
            return File(bytes, "application/octet-stream");
        }

        [Route("download")]
        [HttpGet]
        public async Task<IActionResult> Download(string fileName)
        {
            var bytes = await _documentService.Get(fileName);
            return new FileContentResult(bytes, "application/octet-stream")
            {
                FileDownloadName = Guid.NewGuid().ToString() + "_" + fileName,
            };

        }

        [Route("fill")]
        [HttpPost]
        public async Task<IActionResult> FillDocument(string fileName, [FromBody] DataPlainModel model)
        {
            var bytes = await _documentService.FillDocument(fileName, model);
            return new FileContentResult(bytes, "application/octet-stream")
            {
                FileDownloadName = Guid.NewGuid().ToString() + "_" + fileName,
            };
        }
    }
}
