namespace SmartTaskManagementAPI.Models
{
    public enum UserTaskStatus 
    { 
        Pending,
        InProgress,
        Completed
    }

    public class UserTask
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public UserTaskStatus Status { get; set; } = UserTaskStatus.Pending;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }
        public User UserDetails { get; set; } = null!;

    }
}
