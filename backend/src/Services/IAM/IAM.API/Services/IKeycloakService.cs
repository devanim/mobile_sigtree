using System.Threading.Tasks;
using IAM.API.DTO;
using Keycloak.Net.Models.Groups;
using Keycloak.Net.Models.Roles;
using Keycloak.Net.Models.Users;

namespace IAM.API.Services
{
    public interface IKeycloakService
    {
        Task<bool> GreateGroup(Group group);
        Task<int> GetGroups();
        Task<bool> CreateRole(Role role);
        Task<bool> AddUserInRole(UserRoleDTO userRoleDto);
        Task<bool> UpdateGroup(Group group);
        Task<bool> DeleteGroup(string groupId);
        Task<bool> UpdateUser(User user);
        Task<bool> DeleteUser(string userId);
        Task<bool> DeleteRole(string roleId);
        Task<bool> UpdateRole(Role role);
        Task<Role> GetRoleById(string roleId);
        Task<User> GetUserById(string userId);
    }
}
