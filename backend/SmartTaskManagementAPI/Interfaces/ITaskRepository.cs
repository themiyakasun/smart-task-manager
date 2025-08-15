using SmartTaskManagementAPI.Dtos.Task;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Interfaces
{
    public interface ITaskRepository
    {
        public Task<UserTask?> CreateAsync(TaskDto taskDto); 
    }
}
