using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Dtos.Task
{
    public class TaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public UserTaskStatus Status { get; set; } = UserTaskStatus.Pending;
        public int UserId { get; set; }
    }
}
