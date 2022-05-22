using IAM.API.Helpers.Token;

namespace IAM.API.Helpers.Services
{
	public interface IAuthenticateService
	{
		bool IsAuthenticated(TokenRequest request, out string token);
	}
}
