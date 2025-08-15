using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartTaskManagementAPI.Dtos;
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
    }
}
