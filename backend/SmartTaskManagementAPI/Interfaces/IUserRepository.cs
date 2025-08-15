using SmartTaskManagementAPI.Dtos;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Interfaces
{
    public interface IUserRepository
    {
        public Task<User?> RegisterAsync(UserDto userDto);
    }
}
