using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers
{
    [Route("api/UserManagement")]
    public class UserManagementController : APIControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private IMapper _mapper;

        public UserManagementController(UserManager<ApplicationUser> userManager, IMapper mapper) {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("List")]
        public List<UserManagementModel> Users() {
            var users = _mapper.Map<List<UserManagementModel>>(_userManager.Users.ToList());
            return users;
        }

    }
}