﻿namespace IAM.API.Helpers.Services
{
	public interface IUserManagementService
	{
		bool IsValidUser(string username, string password);
	}
}
