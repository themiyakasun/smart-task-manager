using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartTaskManagementAPI.Dtos.Task;
using SmartTaskManagementAPI.Helpers;
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
        [HttpGet]
        [Route("usertasks/{userId}", Name = "GetUserTasks")]
        public async Task<ActionResult<List<UserTask>>> GetUserTasks([FromQuery] QueryObject query, int userId)
        {
            if (userId <= 0) return BadRequest("Invalid user ID.");

            var tasks = await _taskRepository.GetUserTasksAsync(query, userId);

            if (tasks is null || tasks.Count == 0) return NotFound("No tasks found for the user.");

            return tasks;
        }
        [HttpGet]
        [Route("{id}", Name = " GetTaskById")]
        public async Task<ActionResult<UserTask>> GetTaskByID(int id)
        {
            if (id <= 0) return BadRequest("Invalid task ID.");

            var task = await _taskRepository.GetTaskByIdAsync(id);

            if (task is null) return NotFound($"Task with {id} not found");

            return Ok(task);
        }
    }
}
