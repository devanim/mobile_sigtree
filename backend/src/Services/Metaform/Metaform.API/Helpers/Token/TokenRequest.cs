using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Metaform.API.Helpers.Token
{
	/// <summary>
	/// 
	/// </summary>
	public class TokenRequest
	{
		[Required]
		[JsonProperty("username")]
		public string Username { get; set; }


		[Required]
		[JsonProperty("password")]
		public string Password { get; set; }
	}
}
