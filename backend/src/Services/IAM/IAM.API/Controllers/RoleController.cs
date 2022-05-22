using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using IAM.API.Services;
using Keycloak.Net.Models.Roles;
using Microsoft.AspNetCore.Authorization;

namespace IAM.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly ILogger<RoleController> _logger;
        private readonly IKeycloakService _keycloakService;

        public RoleController(ILogger<RoleController> logger, IKeycloakService keycloakService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _keycloakService = keycloakService ?? throw new ArgumentNullException(nameof(keycloakService));
        }

        [HttpGet("{roleId}")]
        [ProducesResponseType(typeof(Role), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Role>> GetGroupCount(string roleId)
        {
            return Ok(await _keycloakService.GetRoleById(roleId));
        }


        [HttpPost]  
        [ProducesResponseType(typeof(Role), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Role>> CreateRoleAsync([FromBody] Role role)
        {
            try
            {
                await _keycloakService.CreateRole(role);
                return Ok(role);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(Role), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Role>> UpdateRoleAsync([FromBody] Role role)
        {
            try
            {
                await _keycloakService.CreateRole(role);
                return Ok(role);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        [HttpDelete("{roleId}")]
        [ProducesResponseType(typeof(Role), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Role>> DeleteRoleAsync(string roleId)
        {
            try
            {
                await _keycloakService.DeleteRole(roleId);
                return Ok("Role has been deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }
    }
}
