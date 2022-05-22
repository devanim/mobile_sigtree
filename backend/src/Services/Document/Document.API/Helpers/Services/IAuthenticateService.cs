using Document.API.Helpers.Token;

namespace Document.API.Helpers.Services
{
	public interface IAuthenticateService
	{
		bool IsAuthenticated(TokenRequest request, out string token);
	}
}
