using System.Collections.Generic;
using Keycloak.Net.Models.Roles;

namespace IAM.API.DTO
{
    public class UserRoleDTO
    {
        public string UserId { get; set; }
        public IEnumerable<Role> RealmRoles { get; set; }
        public IEnumerable<Role> ClientRoles { get; set; }

    }
}
