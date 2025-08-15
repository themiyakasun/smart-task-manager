namespace SmartTaskManagementAPI.Dtos.User
{
    public class TokenResponseDto
    {
        public required string AccessToken { get; set; }
        public required string RefrshToken { get; set; }
    }
}
