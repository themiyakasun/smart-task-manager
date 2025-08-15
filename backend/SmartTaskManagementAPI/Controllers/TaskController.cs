using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartTaskManagementAPI.Dtos.Task;
using SmartTaskManagementAPI.Interfaces;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpPost("create")]
        public async Task<ActionResult<UserTask>> CreateTask(TaskDto taskDto)
        {
            var task = await _taskRepository.CreateAsync(taskDto);

            if(task is null) return BadRequest("Task with this title already exists for the user.");

            return Ok(task);
        }
    }
}
