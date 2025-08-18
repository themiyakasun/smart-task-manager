namespace SmartTaskManagementAPI.Dtos.User
{

    public class LoginResponseDto
    {
        public UserDto User { get; set; } = null!;
        public TokenResponseDto Token { get; set; } = null!;
    }
}
