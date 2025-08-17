using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Dtos.Task
{
    public class UpdateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public UserTaskStatus Status { get; set; } = UserTaskStatus.Pending;
    }
}
