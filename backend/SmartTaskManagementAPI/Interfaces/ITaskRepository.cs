using SmartTaskManagementAPI.Dtos.Task;
using SmartTaskManagementAPI.Helpers;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Interfaces
{
    public interface ITaskRepository
    {
        public Task<UserTask?> CreateAsync(TaskDto taskDto);
        public Task<List<UserTask>> GetUserTasksAsync(QueryObject query, int userId);
        public Task<UserTask?> GetTaskByIdAsync(int taskId);
        public Task<UserTask?> UpdateTaskAsync(int taskId, UpdateTaskDto updateTaskDto);
    }
}
