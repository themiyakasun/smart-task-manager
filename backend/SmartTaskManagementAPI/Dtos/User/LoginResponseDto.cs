namespace SmartTaskManagementAPI.Dtos.User
{
    public class LoginResponseUserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
    public class LoginResponseDto
    {
        public LoginResponseUserDto User { get; set; } = null!;
        public TokenResponseDto Token { get; set; } = null!;
    }
}
