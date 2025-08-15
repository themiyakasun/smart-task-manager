using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartTaskManagementAPI.Data;
using SmartTaskManagementAPI.Dtos.Task;
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
    }
}
