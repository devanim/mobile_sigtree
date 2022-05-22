using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using IAM.API.Services;
using Keycloak.Net.Models.Groups;
using Keycloak.Net.Models.Roles;
using Microsoft.AspNetCore.Authorization;

namespace IAM.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly ILogger<GroupController> _logger;
        private readonly IKeycloakService _keycloakService;

        public GroupController(ILogger<GroupController> logger, IKeycloakService keycloakService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _keycloakService = keycloakService ?? throw new ArgumentNullException(nameof(keycloakService));
        }

        [HttpGet]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<int>>> GetGroupCount()
        {
            return Ok(await _keycloakService.GetGroups());
        }

        [HttpPost]
        [ProducesResponseType(typeof(Group), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Group>> InsertOneAsync([FromBody] Group group)
        {
            try
            {
                await _keycloakService.GreateGroup(group);
                return Ok(group);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(Group), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Group>> UpdateGroup([FromBody] Group group)
        {
            try
            {
                await _keycloakService.UpdateGroup(group);
                return Ok(group);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        [HttpDelete("{groupId}")]
        [ProducesResponseType(typeof(Group), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Group>> DeleteTenant(string groupId)
        {
            try
            {
                await _keycloakService.DeleteGroup(groupId);
                return Ok("Group has been deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }
    }
}
