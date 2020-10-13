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
    [Route("api/User")]
    public class UserController : APIControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserController(UserManager<ApplicationUser> userManager, IMapper mapper) {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetUserDetail")]
        public RegisterModel GetUserDetail() {
            var user = _mapper.Map<RegisterModel>(_userManager.FindByIdAsync(base.GetUser()).Result);
            return user;
        }

        [HttpGet]
        [Route("GetSellerPhoneNumber/{id}")]
        public string GetSellerPhoneNumber(string id) {
            var user = _userManager.FindByIdAsync(id).Result;
            return user.PhoneNumber;
        }
    }
}