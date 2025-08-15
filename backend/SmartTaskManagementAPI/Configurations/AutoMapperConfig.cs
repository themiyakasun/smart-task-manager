using AutoMapper;
using SmartTaskManagementAPI.Dtos;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Configurations
{
    public class AutoMapperConfig: Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<UserDto, User>().ReverseMap();
        }
    }
}
