using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartTaskManagementAPI.Data;
using SmartTaskManagementAPI.Dtos.User;
using SmartTaskManagementAPI.Interfaces;
using SmartTaskManagementAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

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
            if (await _dbContext.Users.AnyAsync(u => u.Email == userDto.Email))
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
        public async Task<LoginResponseDto?> LoginAsync(LoginDto loginDto)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user is null) return null;

            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, loginDto.Password) == PasswordVerificationResult.Failed) return null;

            TokenResponseDto tokenResponse = await CreateTokenRespone(user);

            return new LoginResponseDto
            {
                User = new LoginResponseUserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name
                },
                Token = tokenResponse
            };
        }

        public async Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto refreshTokenRequestDto)
        {
            var user = await ValidateRefreshTokenAsync(refreshTokenRequestDto.UserId, refreshTokenRequestDto.RefreshToken);

            if (user is null) return null;

            TokenResponseDto tokenResponse = await CreateTokenRespone(user);
            return tokenResponse;
        }

        private async Task<TokenResponseDto> CreateTokenRespone(User user)
        {
            return new TokenResponseDto
            {
                AccessToken = CreateToken(user),
                RefrshToken = await GenerateAndSaveRefreshTokenAsync(user)
            };
        }
        private async Task<User?> ValidateRefreshTokenAsync(int userId, string refreshToken)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            return user;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var refershToken = GenerateRefreshToken();
            user.RefreshToken = refershToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _dbContext.SaveChangesAsync();
            return refershToken;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AppSettings:Token")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("AppSettings:Issuer"),
                audience: _configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

    }
}
