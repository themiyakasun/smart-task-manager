using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartTaskManagementAPI.Data;
using SmartTaskManagementAPI.Dtos.Task;
using SmartTaskManagementAPI.Helpers;
using SmartTaskManagementAPI.Interfaces;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Repositories

{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public TaskRepository(ApplicationDbContext dbContext, IMapper mapper)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<UserTask?> CreateAsync(TaskDto taskDto)
        {
            if (await _dbContext.Tasks.AnyAsync(t => t.Title == taskDto.Title && t.UserId == taskDto.UserId)) return null;

            UserTask task = _mapper.Map<UserTask>(taskDto);

            _dbContext.Add(task);
            await _dbContext.SaveChangesAsync();

            return task;
        }

        public async Task<UserTask?> GetTaskByIdAsync(int taskId)
        {
            var task = await _dbContext.Tasks.FirstOrDefaultAsync(t => t.Id == taskId);

            return task;
        }

        public async Task<List<UserTask>> GetUserTasksAsync(QueryObject query, int userId)
        {
            var tasks = _dbContext.Tasks
                .Where(t => t.UserId == userId)
                .AsQueryable();

            if (!string.IsNullOrEmpty(query.Search))
            {
                tasks = tasks.Where(t => t.Title.Contains(query.Search) || t.Description.Contains(query.Search));
            }

            if (!string.IsNullOrEmpty(query.Status))
            {
                if (Enum.TryParse<UserTaskStatus>(query.Status, out var status))
                {
                    tasks = tasks.Where(t => t.Status == status);
                }
            }

            if (!string.IsNullOrEmpty(query.SortBy))
            {
                if(query.SortBy.Equals("CreatedAt", StringComparison.OrdinalIgnoreCase))
                {
                    tasks = query.isDescending ? tasks.OrderByDescending(t => t.CreatedAt) : tasks.OrderBy(t => t.CreatedAt);
                }
                else if (query.SortBy.Equals("Title", StringComparison.OrdinalIgnoreCase))
                {
                    tasks = query.isDescending ? tasks.OrderByDescending(t => t.Title) : tasks.OrderBy(t => t.Title);
                }
            }

            var skipSize = (query.PageNumber - 1) * query.PageSize;

            return await tasks.Skip(skipSize).Take(query.PageSize).ToListAsync();
        }

        public async Task<UserTask?> UpdateTaskAsync(int taskId, UpdateTaskDto updateTaskDto)
        {
            var existingTask = await _dbContext.Tasks.FindAsync(taskId);

            if (existingTask is null) return null;

            existingTask.Title = updateTaskDto.Title;
            existingTask.Description = updateTaskDto.Description;
            existingTask.Status = updateTaskDto.Status;

            await _dbContext.SaveChangesAsync();

            return existingTask;
        }
    }
}
