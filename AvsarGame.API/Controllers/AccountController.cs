
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.API.Security;
using AvsarGame.Dal.Concreate.EntityFramework;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace AvsarGame.API.Controllers {
    [Route("api/Account")]
    [Produces("application/json")]
    [AllowAnonymous]
    public class AccountController : ControllerBase {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private JWTAuth jwtAuth;

        public AccountController(
                UserManager<ApplicationUser> userManager,
                SignInManager<ApplicationUser> signInManager,
                RoleManager<IdentityRole> roleManager,
                IConfiguration configuration) {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            jwtAuth = new JWTAuth(configuration);
        }

        [HttpPost("Login")]
        public async Task<Response<LoggedModel>> Login([FromBody] LoginModel model) {
            try {
                LoggedModel loggedModel = new LoggedModel();
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

                if (result.Succeeded) {
                    var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);
                    var userRoles = await _userManager.GetRolesAsync(appUser);
                    
                    foreach (var role in userRoles) {
                        await _userManager.AddToRoleAsync(appUser, role);
                    }
                    
                    appUser.BearerToken = jwtAuth.GenerateJwtToken(model.Email, appUser);

                    loggedModel.UserId = appUser.Id;
                    loggedModel.Name = appUser.Name;
                    loggedModel.Surname = appUser.Surname;
                    loggedModel.Birthdate = appUser.Birthdate;
                    loggedModel.Age = appUser.Age;
                    loggedModel.BearerToken = appUser.BearerToken;


                    return new Response<LoggedModel> { IsSuccess = true, Value = loggedModel };
                } else {
                    return new Response<LoggedModel> { IsSuccess = false, Message = "Kullanıcı Adı veya Şifre yanlış" };
                }
            } catch (Exception e) {
                return new Response<LoggedModel> { IsSuccess = false, Message = "Bir hata oluştu lütfen sonra tekrar deneyiniz"};
            }
        }
        
        [HttpPost("Register")]
        public async Task<Response<RegisterModel>> Register([FromBody] RegisterModel model) {
            Response<RegisterModel> response= new Response<RegisterModel>();
            RegisterModel registerModel = new RegisterModel();
            try {
                var identityUser = new ApplicationUser {
                        UserName = model.Email,
                        Email = model.Email,
                        PhoneNumber = model.PhoneNumber,
                        Name = model.Name,
                        Surname = model.Surname,
                        Gender = model.Gender,
                        Birthdate = model.Birthdate,
                };

                var result = await _userManager.CreateAsync(identityUser, model.Password);

                if (result.Succeeded) {
                    string role = "User";
                    await _userManager.AddToRoleAsync(identityUser, role);
                    await _userManager.AddClaimAsync(identityUser, new System.Security.Claims.Claim("role", role));
                    var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);
                    registerModel.BearerToken = jwtAuth.GenerateJwtToken(model.Email, appUser);
                    registerModel.Name = model.Name;
                    registerModel.Surname = model.Surname;
                    registerModel.Id = appUser.Id;
                    response.Value = registerModel;
                    response.IsSuccess = true;
                    return response;
                } else {
                    registerModel.Errors = GetErrorDescription(result.Errors.ToList());
                    response.Value = registerModel;
                    response.IsSuccess = false;
                    return response;
                }
            } catch (Exception e) {
                response.IsSuccess = false;
                response.Exception = e.InnerException;
                return response;
            }
        }

        [HttpGet]
        [Route("Logout")]
        public HttpStatusCode Logout()
        {
             _signInManager.SignOutAsync();
            
            return HttpStatusCode.OK;
        }

        private string GetErrorDescription(List<IdentityError> error)
        {
            throw new NotImplementedException();
        }
    }
}