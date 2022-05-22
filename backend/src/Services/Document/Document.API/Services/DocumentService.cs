using System;
using Azure.Storage.Blobs;
using Document.API.Models;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Document.API.Helpers;
using DocumentFormat.OpenXml.Packaging;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenXmlPowerTools;

namespace Document.API.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly BlobServiceClient _documentServiceClient;
        private readonly string _tenantId;

        public DocumentService(BlobServiceClient documentServiceClient, string tenantId)
        {
            _documentServiceClient = documentServiceClient;
            _tenantId = tenantId;
        }

        public async Task<byte[]> Get(string fileName)
        {
            var blobContainer = _documentServiceClient.GetBlobContainerClient("seltxtdocuments");

            var blobClient = blobContainer.GetBlobClient(fileName);
            var downloadContent = await blobClient.DownloadAsync();
            using MemoryStream ms = new MemoryStream();
            await downloadContent.Value.Content.CopyToAsync(ms);
            return ms.ToArray();
        }

        public async Task<byte[]> FillDocument(string fileName, DataPlainModel model)
        {
            var blobContainer = _documentServiceClient.GetBlobContainerClient("seltxtdocuments");

            string json = JsonConvert.DeserializeObject<string>(model.Data);
            JObject jObject = JObject.Parse(json);

            var blobClient = blobContainer.GetBlobClient($"{_tenantId}/{fileName}");
            var downloadContent = await blobClient.DownloadAsync();
            MemoryStream memoryStream = new MemoryStream();
            await downloadContent.Value.Content.CopyToAsync(memoryStream);
            using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(memoryStream, true))
            {
                SimplifyMarkupSettings settings = new SimplifyMarkupSettings
                {
                    RemoveComments = true,
                    RemoveContentControls = true,
                    RemoveEndAndFootNotes = true,
                    RemoveFieldCodes = false,
                    RemoveLastRenderedPageBreak = true,
                    RemovePermissions = true,
                    RemoveProof = true,
                    RemoveRsidInfo = true,
                    RemoveSmartTags = true,
                    RemoveSoftHyphens = true,
                    ReplaceTabsWithSpaces = true,
                };
                MarkupSimplifier.SimplifyMarkup(wordDoc, settings);

                string docText = null;
                using (StreamReader sr = new StreamReader(wordDoc.MainDocumentPart.GetStream()))
                    docText = sr.ReadToEnd();
              

                foreach (var propety in  jObject.Properties())
                {
                    var find = "Teren-SituatieExistenta-NrCadastral";
                    var value = jObject.GetValue(propety.Name).ToString();
                    // docText = docText.Replace("", jObject.GetValue(propety.Name).ToString());
                    docText = ReplaceWholeWord(docText, find, value);
                    // docText = new Regex(find, RegexOptions.ExplicitCapture).Replace(docText, jObject.GetValue(propety.Name).ToString());
                }


                using (StreamWriter sw = new StreamWriter(wordDoc.MainDocumentPart.GetStream(FileMode.Create)))
                    sw.Write(docText);
            }
            return memoryStream.ToArray();
        }

        static public string ReplaceWholeWord(string original, string wordToFind, string replacement, RegexOptions regexOptions = RegexOptions.None)
        {
            string pattern = String.Format(@"{0}", wordToFind);
            string ret = Regex.Replace(original, pattern, replacement, regexOptions);
            return ret;
        }

        public async Task Upload(DocumentModel model)
        {
            var blobContainer = _documentServiceClient.GetBlobContainerClient("seltxtdocuments");

            var blobClient = blobContainer.GetBlobClient($"{_tenantId}/{(!string.IsNullOrEmpty(model.FilePath) ? $"{model.FilePath}/" : string.Empty)}{model.File.FileName}");

            await blobClient.UploadAsync(model.File.OpenReadStream());
        }
    }
}
