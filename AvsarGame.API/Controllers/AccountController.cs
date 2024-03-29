﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Helpers;
using AvsarGame.API.Models;
using AvsarGame.API.Security;
using AvsarGame.Dal.Concreate.EntityFramework;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
        private readonly IMapper _mapper;
        private JWTAuth jwtAuth;

        public AccountController(
                UserManager<ApplicationUser> userManager,
                SignInManager<ApplicationUser> signInManager,
                RoleManager<IdentityRole> roleManager,
                IConfiguration configuration,
                IMapper mapper) {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            jwtAuth = new JWTAuth(configuration);
            _mapper = mapper;
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

                    appUser.BearerToken = jwtAuth.GenerateJwtToken(model.Email, appUser, userRoles[0]);

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
                return new Response<LoggedModel> { IsSuccess = false, Message = "Bir hata oluştu lütfen sonra tekrar deneyiniz" };
            }
        }

        [HttpPost("Register")]
        public async Task<Response<RegisterModel>> Register([FromBody] RegisterModel model) {
            Response<RegisterModel> response = new Response<RegisterModel>();
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
                    registerModel.BearerToken = jwtAuth.GenerateJwtToken(model.Email, appUser, role);
                    registerModel.Name = model.Name;
                    registerModel.Surname = model.Surname;
                    registerModel.Id = appUser.Id;
                    response.Value = registerModel;
                    response.IsSuccess = true;
                    return response;
                } else {
                    registerModel.Errors = "";
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

        [HttpPost("Update")]
        public async Task<Response<RegisterModel>> Update([FromBody] RegisterModel model) {
            Response<RegisterModel> response = new Response<RegisterModel>();
            RegisterModel registerModel = new RegisterModel();
            try {
                var user = _userManager.FindByEmailAsync(model.Email).Result;
                user.UserName = model.Email;
                user.Email = model.Email;
                user.PhoneNumber = model.PhoneNumber;
                user.Name = model.Name;
                user.Surname = model.Surname;
                user.EmailConfirmed = model.EmailConfirmed;
                user.PhoneNumberConfirmed = user.PhoneNumber == model.PhoneNumber ? model.PhoneNumberConfirmed : false;

                var update = await _userManager.UpdateAsync(user);

                if (update.Succeeded) {
                    response.IsSuccess = true;
                    return response;
                } else {
                    registerModel.Errors = "";
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
        public HttpStatusCode Logout() {
            _signInManager.SignOutAsync();

            return HttpStatusCode.OK;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("ForgotPassword")]
        public async Task<HttpStatusCode> ForgotPassword([FromBody] ForgotPasswordModel model) {
            var user = await _userManager.FindByNameAsync(model.Email);
            //if (user == null || !(await _userManager.IsEmailConfirmedAsync(user))) {
            //    return HttpStatusCode.BadRequest;
            //}
            if (user == null) {
                return HttpStatusCode.BadRequest;
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var callbackUrl = model.RequestSchema + "/user/ResetPassword?email=" + model.Email + "&token=" + token;

            MailSenderController controller = new MailSenderController();
            await controller.SendForgotPasswordMail(model.Email, "Reset Password",
                    $"Linke tıklayarak şifrenizi değiştirebilirsiniz : <a href='{callbackUrl}'>Şifre değiştir</a> bu isteği siz göndermediyseniz hemen müşteri hizmetlerimizden yardım alın");

            return HttpStatusCode.OK;
        }

        [HttpPost]
        [Route("ResetPassword")]
        public Response<HttpStatusCode> ResetPassword([FromBody] ResetPasswordModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                var user = _userManager.FindByNameAsync(model.Email).Result;
                if (user == null) {
                    response.IsSuccess = false;
                    response.Message = "User bulunamadı";
                    return response;
                }
                var result = _userManager.ResetPasswordAsync(user, model.Token, model.Password).Result;
                if (result.Succeeded) {
                    response.IsSuccess = true;
                    response.Message = "Şifreniz Değiştirildi";
                    return response;
                } else {
                    response.IsSuccess = false;
                    response.Message = "Şifre yenileme süreniz dolmuştur.";
                    return response;
                }
            } catch (Exception e) {
                response.IsSuccess = false;
                response.Message = "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
                return response;
            }
        }
    }
}