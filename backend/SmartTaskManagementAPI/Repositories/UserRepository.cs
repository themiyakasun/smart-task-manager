using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartTaskManagementAPI.Data;
using SmartTaskManagementAPI.Dtos;
using SmartTaskManagementAPI.Interfaces;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UserRepository(ApplicationDbContext dbContext, IConfiguration configuration, IMapper mapper)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            _mapper = mapper;
        }
        public async Task<User?> RegisterAsync(UserDto userDto)
        {
            if(await _dbContext.Users.AnyAsync(u => u.Email == userDto.Email))
            {
                return null;
            }

            User user = _mapper.Map<User>(userDto);

            var hashedPassword = new PasswordHasher<User>().HashPassword(new User(), userDto.Password);
            user.PasswordHash = hashedPassword;

            _dbContext.Add(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }
    }
}
