using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Metaform.API.Helpers.Token;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Metaform.API.Helpers.Services
{
	/// <summary>
	/// TokenAuthenticationService
	/// </summary>
	public class TokenAuthenticationService : IAuthenticateService
	{
		private readonly IUserManagementService _userManagementService;
		private readonly TokenManagement _tokenManagement;

		/// <summary>
		/// TokenAuthenticationService
		/// </summary>
		/// <param name="service"></param>
		/// <param name="tokenManagement"></param>
		public TokenAuthenticationService(IUserManagementService service, IOptions<TokenManagement> tokenManagement)
		{
			_userManagementService = service;
#pragma warning disable CA1062 // Validate arguments of public methods
#pragma warning disable S3900 // Arguments of public methods should be validated against null
			_tokenManagement = tokenManagement.Value;
#pragma warning restore S3900 // Arguments of public methods should be validated against null
#pragma warning restore CA1062 // Validate arguments of public methods
		}
#pragma warning disable CA1021 // Avoid out parameters
		public bool IsAuthenticated(TokenRequest request, out string token)
#pragma warning restore CA1021 // Avoid out parameters
		{
			if (request == null)
			{
				throw new BadHttpRequestException(nameof(request));
			}
			token = string.Empty;
			if (!_userManagementService.IsValidUser(request.Username, request.Password))
			{
				return false;
			}
			Claim[] claim = new[]
			{
				new Claim(ClaimTypes.Name, request.Username)
			};
			SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_tokenManagement.Secret));
			SigningCredentials credentials = new(key, SecurityAlgorithms.HmacSha256);

			JwtSecurityToken jwtToken = new(
				_tokenManagement.Issuer,
				_tokenManagement.Audience,
				claim,
				expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
				signingCredentials: credentials
			);
			token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
			return true;

		}
	}
}
