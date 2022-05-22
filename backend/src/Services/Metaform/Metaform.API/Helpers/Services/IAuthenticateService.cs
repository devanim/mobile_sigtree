using Metaform.API.Helpers.Token;

namespace Metaform.API.Helpers.Services
{
	public interface IAuthenticateService
	{
		bool IsAuthenticated(TokenRequest request, out string token);
	}
}
