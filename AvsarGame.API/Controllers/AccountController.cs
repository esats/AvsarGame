using System;
using System.Collections.Generic;
using System.Linq;
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
    [ApiController]
    [Route("api/Account")]
    [Produces("application/json")]
    [AllowAnonymous]
    public class AccountController : APIControllerBase {
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

                    loggedModel.Name = appUser.Name;
                    loggedModel.Surname = appUser.Surname;
                    loggedModel.Birthdate = appUser.Birthdate;
                    loggedModel.Age = appUser.Age;
                    loggedModel.BearerToken = appUser.BearerToken;

                    return new Response<LoggedModel> { IsSuccess = true, Value = loggedModel };
                }
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }

            return new Response<LoggedModel> { IsSuccess = false, Message = "Kullanıcı Adı veya Şifre yanlış" };
        }

        //[HttpPost("PortalLogin")]
        //[Authorize(Roles ="admin")]
        //public async Task<Response<ApplicationUser>> PortalLogin([FromBody]LoginModel model)
        //{
        //    try
        //    {
        //        var response = new Response<ApplicationUser>();
        //        var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
        //        if (result.Succeeded)
        //        {
        //            var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);

        //            using (var context = new AvsarGameDBcontext())
        //            {
        //                var userRoles = context.UserRoles.SingleOrDefault(x => x.UserId == appUser.Id);

        //                if (userRoles != null)
        //                {
        //                    var role = context.Roles.SingleOrDefault(f => f.Id == userRoles.RoleId);

        //                    if (role != null && role.Name == "admin")
        //                    {
        //                        appUser.BearerToken = JWTAuth.Instance.GenerateJwtToken(model.Email, appUser);
        //                        return new Response<ApplicationUser> { IsSuccess = true, Value = appUser };
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        string message = ex.Message;
        //    }

        //    return new Response<ApplicationUser> { IsSuccess = false, Message = "Kullanıcı Adı veya Şifre yanlış" };
        //}

        [HttpPost("Register")]
        public async Task<Response<ApplicationUser>> Register([FromBody] RegisterModel model) {
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

                if (model.Id != Guid.Empty) {
                    var updatedEntity = _userManager.Users.SingleOrDefault(r => r.Id == model.Id.ToString());
                    updatedEntity.Name = model.Name;
                    updatedEntity.Surname = model.Surname;
                    updatedEntity.Birthdate = model.Birthdate;
                    updatedEntity.Email = model.Email;
                    updatedEntity.UserName = model.Email;
                    updatedEntity.NormalizedEmail = model.Email;
                    updatedEntity.PhoneNumber = model.PhoneNumber;
                    var update = await _userManager.UpdateAsync(updatedEntity);
                    return new Response<ApplicationUser>(updatedEntity);
                } else {
                    var result = await _userManager.CreateAsync(identityUser, model.Password);

                    if (result.Succeeded) {
                        string role = "User";
                        await _userManager.AddToRoleAsync(identityUser, role);
                        //await _userManager.AddClaimAsync(identityUser, new System.Security.Claims.Claim("userName", identityUser.UserName));
                        //await _userManager.AddClaimAsync(identityUser, new System.Security.Claims.Claim("email", identityUser.Email));
                        await _userManager.AddClaimAsync(identityUser, new System.Security.Claims.Claim("role", role));

                        var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);
                        appUser.BearerToken = jwtAuth.GenerateJwtToken(model.Email, appUser);
                        return new Response<ApplicationUser>(appUser);
                    }
                }
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }

            throw new ApplicationException("INVALID_LOGIN_ATTEMPT");
        }
    }
}