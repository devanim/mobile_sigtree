using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Metaform.API.Data;
using Metaform.API.EntitySchemas;
using Metaform.API.Helpers;
using Metaform.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
    
namespace Metaform.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly ILogger<DataController> _logger;
        private readonly DataRepository _repository;

        public DataController(ILogger<DataController> logger, DataRepository repository)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _repository = repository;
        }


        [HttpGet("{collection}/{id:length(24)}", Name = "GetDataById")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<DataPlainModel>> GetEntityById(string collection, string id)
        {
            try
            {
                var entity = await _repository.GetEntityById(collection, id);
                return Ok(entity);
            }

            catch (Exception ex)
            {
                _logger.LogError($"Entity with id: {ex.Message}, not found.");
                _logger.LogError($"Entity with id: {id}, not found.");
                return NotFound();
            }
        }

        [HttpGet("{collectionName}")]
        [ProducesResponseType(typeof(IEnumerable<DataPlainModel>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<DataPlainModel>>> GetData(string collectionName)
        {
            var dataList = await _repository.GetDataAsync(collectionName);
            return Ok(dataList);
        }

        [HttpPost("{collectionName}")]
        [ProducesResponseType(typeof(DataPlainModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<DataPlainModel>> InsertOneAsync(string collectionName, [FromBody] DataPlainModel document)
        {
            try
            {
                var data  = await _repository.InsertOneAsync(collectionName, document);
                return Ok(document);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{collectionName}")]
        [ProducesResponseType(typeof(DataPlainModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEntity(string collectionName, [FromBody] DataPlainModel document)
        {
            try
            {
                await _repository.UpdateEntity(collectionName, document);
                return Ok(document);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{collectionName}/{id:length(24)}", Name = "DeleteData")]
        [ProducesResponseType(typeof(DataPlainModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteDataById(string collectionName, string id)
        {
            try
            {
                await _repository.DeleteDataById(collectionName, id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
