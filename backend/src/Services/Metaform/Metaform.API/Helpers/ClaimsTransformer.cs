using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json;

namespace Metaform.API.Helpers
{
    public class ClaimsTransformer : IClaimsTransformation
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="principal"></param>
        /// <returns></returns>
        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            ClaimsIdentity claimsIdentity = (ClaimsIdentity)principal?.Identity;

            if (claimsIdentity == null)
            {
                return Task.FromResult<ClaimsPrincipal>(null);
            }

            // flatten realm_access because Microsoft identity model doesn't support nested claims
            // by map it to Microsoft identity model, because automatic JWT bearer token mapping already processed here
            if (claimsIdentity.IsAuthenticated && claimsIdentity.HasClaim(claim => claim.Type == "realm_access"))
            {
                Claim realmAccessClaim = claimsIdentity.FindFirst(claim => claim.Type == "realm_access");
                Dictionary<string, string[]> realmAccessAsDict = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(realmAccessClaim.Value);
                if (realmAccessAsDict?["roles"] != null)
                {
                    foreach (string role in realmAccessAsDict["roles"])
                    {
                        claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, role));
                    }
                }
            }

            return Task.FromResult(principal);
        }
    }
}
