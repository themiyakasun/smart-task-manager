using AutoMapper;
using SmartTaskManagementAPI.Dtos.Task;
using SmartTaskManagementAPI.Dtos.User;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Configurations
{
    public class AutoMapperConfig: Profile
    {
        public AutoMapperConfig()
        {
            // User mappings
            CreateMap<UserDto, User>().ReverseMap();
            // Task mappings
            CreateMap<TaskDto, UserTask>().ReverseMap();
            CreateMap<UpdateTaskDto, UserTask>().ReverseMap();
        }
    }
}
