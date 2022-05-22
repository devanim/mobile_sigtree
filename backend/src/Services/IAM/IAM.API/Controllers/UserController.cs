using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using IAM.API.DTO;
using IAM.API.Services;
using Keycloak.Net.Models.Groups;
using Keycloak.Net.Models.Roles;
using Keycloak.Net.Models.Users;
using Microsoft.AspNetCore.Authorization;

namespace IAM.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IKeycloakService _keycloakService;
        private readonly ILogger<RoleController> _logger;

        public UserController(IKeycloakService keycloakService, ILogger<RoleController> logger)
        {
            _keycloakService = keycloakService ?? throw new ArgumentNullException(nameof(keycloakService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(typeof(Role), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Role>> GetUserById(string userId)
        {
            return Ok(await _keycloakService.GetUserById(userId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(User), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<User>> AddRoleToUser([FromBody] UserRoleDTO userRoleDto)
        {
            try
            {
                await _keycloakService.AddUserInRole(userRoleDto);
                return Ok("User roles added");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(User), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> UpdateUser([FromBody] User user)
        {
            try
            {
                await _keycloakService.UpdateUser(user);
                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        [HttpDelete("{userId}")]
        [ProducesResponseType(typeof(User), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> DeleteUser(string userId)
        {
            try
            {
                await _keycloakService.DeleteUser(userId);
                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }
    }
}
