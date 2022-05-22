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
    [ApiController]
    [Authorize]
    [Route("api/v1/[controller]")]
    public class EntitySchemaController : ControllerBase
    {
        private readonly EntitySchemaRepository _repository;
        private readonly ILogger<EntitySchemaController> _logger;

        public EntitySchemaController(EntitySchemaRepository repository, ILogger<EntitySchemaController> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<EntitySchemas.EntitySchema>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<EntitySchemas.EntitySchema>>> GetEntities()
        {
            var user = HttpContext.User;
            var entitySchemas = await _repository.FilterBy(c => !c.Disabled);
            return Ok(entitySchemas);
        }

        [HttpGet("{id:length(24)}", Name = "GetEntityById")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(EntitySchema), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<EntitySchema>> GetEntityById(string id)
        {
            var entitySchema = await _repository.FindByIdAsync(id);

            if (entitySchema == null)
            {
                _logger.LogError($"Entity with id: {id}, not found.");
                return NotFound();
            }

            return Ok(entitySchema);
        }

        [HttpPost]
        [ProducesResponseType(typeof(EntitySchema), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<EntitySchema>> InsertOneAsync([FromBody] EntitySchema entity)
        {
            try
            {
                await _repository.InsertOneAsync(entity);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(EntitySchema), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEntity([FromBody] EntitySchema entity)
        {
            try
            {
                await _repository.ReplaceOneAsync(entity);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id:length(24)}", Name = "DeleteEntity")]        
        [ProducesResponseType(typeof(EntitySchema), (int)HttpStatusCode.OK)]
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
