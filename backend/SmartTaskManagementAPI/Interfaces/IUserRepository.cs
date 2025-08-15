using SmartTaskManagementAPI.Dtos.User;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Interfaces
{
    public interface IUserRepository
    {
        public Task<User?> RegisterAsync(UserDto userDto);
        public Task<TokenResponseDto?> LoginAsync(LoginDto loginDto);
        public Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto refreshTokenRequestDto);
    }
}
