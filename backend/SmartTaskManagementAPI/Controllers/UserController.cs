using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartTaskManagementAPI.Dtos.User;
using SmartTaskManagementAPI.Interfaces;
using SmartTaskManagementAPI.Models;
using System.Threading.Tasks;

namespace SmartTaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto userDto)
        {
            var user = await _userRepository.RegisterAsync(userDto);

            if(user is null) return BadRequest("User with this email already exists.");

            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseDto>> Login(LoginDto loginDto)
        {
            var result = await _userRepository.LoginAsync(loginDto);

            if(result is null)
            {
                return BadRequest("Invalid email or password.");
            }

            return Ok(result);
        }
        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto refreshTokenRequestDto)
        {
            var result = await _userRepository.RefreshTokenAsync(refreshTokenRequestDto);

            if (result is null || result.AccessToken is null || result.RefrshToken is null) return Unauthorized("Invalid refresh token or user id.");

            return Ok(result);
        }
    }
}
