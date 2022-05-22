using DnsClient.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Metaform.API.EntitySchemas;
using Metaform.API.Repositories;
using Metaform.API.Repositories.RepositoryBase;
using Microsoft.AspNetCore.Authorization;

namespace Metaform.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DictionaryController : ControllerBase
    {
        private readonly DictionaryRepository _repository;
        private readonly ILogger<DictionaryController> _logger;

        public DictionaryController(DictionaryRepository repository, ILogger<DictionaryController> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Dictionary>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Dictionary>>> GetDictionaries()
        {
            var dictionaries = await _repository.FilterBy(c => c.Disabled);
            return Ok(dictionaries);
        }

        [HttpGet("{id:length(24)}", Name = "GetDictionaryById")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(Dictionary), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Dictionary>> GetDictionaryById(string id)
        {
            var dictionary = await _repository.FindByIdAsync(id);

            if (dictionary == null)
            {
                _logger.LogError($"Entity with id: {id}, not found.");
                return NotFound();
            }

            return Ok(dictionary);
        }


        [HttpPost]
        [ProducesResponseType(typeof(Dictionary), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Dictionary>> InsertOneAsync([FromBody] Dictionary dictionary)
        {
            try
            {
                await _repository.InsertOneAsync(dictionary);
                return Ok(dictionary);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(Dictionary), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEntity([FromBody] Dictionary dictionary)
        {
            try
            {
                await _repository.ReplaceOneAsync(dictionary);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id:length(24)}", Name = "DeleteDictionary")]        
        [ProducesResponseType(typeof(Dictionary), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteEntityById(string id)
        {
            try
            {
                await _repository.DeleteByIdAsync(id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
