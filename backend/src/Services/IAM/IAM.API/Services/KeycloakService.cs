using System.Threading.Tasks;
using IAM.API.DTO;
using Keycloak.Net;
using Keycloak.Net.Models.Groups;
using Keycloak.Net.Models.Roles;
using Keycloak.Net.Models.Users;
using Microsoft.Extensions.Logging;

namespace IAM.API.Services
{
    public class KeycloakService : IKeycloakService
    {
        public const string Realm = "SELF.TXT";
        public const string ClientId = "self.txt";
        private readonly ILogger<KeycloakService> _logger;
        private readonly KeycloakClient _keycloakClient;

        public KeycloakService(ILogger<KeycloakService> logger)
        {
            _logger = logger;
            _keycloakClient = new KeycloakClient("http://localhost:8024", "andreiviorelbadea@gmail.com", "parola");
        }

        public async Task<bool> GreateGroup(Group group)
        {
            return await _keycloakClient.CreateGroupAsync(Realm, group).ConfigureAwait(false);
        }

        public async Task<int> GetGroups()
        {
            return await _keycloakClient.GetGroupsCountAsync(Realm);
        }

        public async Task<bool> CreateRole(Role role)
        {
            return await _keycloakClient.CreateRoleAsync(Realm, role);
        }

        public async Task<bool> AddUserInRole(UserRoleDTO userRoleDto)
        {
            await _keycloakClient.AddRealmRoleMappingsToUserAsync(Realm, userRoleDto.UserId, userRoleDto.RealmRoles).ConfigureAwait(false);
            return await _keycloakClient.AddClientRoleMappingsToUserAsync(Realm, userRoleDto.UserId, ClientId, userRoleDto.ClientRoles).ConfigureAwait(false);
        }

        public async Task<bool> UpdateGroup(Group group)
        {
            return await _keycloakClient.UpdateGroupAsync(Realm, group.Id, group).ConfigureAwait(false);
        }

        public async Task<bool> DeleteGroup(string groupId)
        {
            //TODO: Maybe we will need to delete all the resources based on the tenant(group)
            return await _keycloakClient.DeleteGroupAsync(Realm, groupId).ConfigureAwait(false);
        }

        public async Task<bool> UpdateUser(User user)
        {
            return await _keycloakClient.UpdateUserAsync(Realm, user.Id, user).ConfigureAwait(false);
        }

        public async Task<bool> DeleteUser(string userId)
        {
            return await _keycloakClient.DeleteUserAsync(Realm, userId).ConfigureAwait(false);
        }

        public async Task<bool> DeleteRole(string roleId)
        {
            return await _keycloakClient.DeleteRoleByIdAsync(Realm, roleId).ConfigureAwait(false);
        }

        public async Task<bool> UpdateRole(Role role)
        {
            return await _keycloakClient.UpdateRoleByIdAsync(Realm, role.Id, role).ConfigureAwait(false);
        }

        public async Task<Role> GetRoleById(string roleId)
        {
            return await _keycloakClient.GetRoleByIdAsync(Realm, roleId).ConfigureAwait(false);
        }

        public async Task<User> GetUserById(string userId)
        {
            return await _keycloakClient.GetUserAsync(Realm, userId).ConfigureAwait(false);
        }
    }
}
