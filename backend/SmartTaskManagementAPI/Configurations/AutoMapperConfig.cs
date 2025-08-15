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
            CreateMap<UserDto, User>().ReverseMap();
            CreateMap<TaskDto, UserTask>().ReverseMap();
        }
    }
}
