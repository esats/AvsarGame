﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Core.ProcedureModels;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/UserNotification")]
    public class UserNotificationController : APIControllerBase {
        private readonly IUserNotification _userNotification;
        private readonly IMapper _mapper;

        public UserNotificationController(IUserNotification userNotification, IMapper mapper) {
            _userNotification = userNotification;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetNotificationUnRead/{id}")]
        public int GetBalance(string id) {
            return _userNotification.GetList(x => x.UserId == id).Count;
        }

        [HttpGet]
        [Route("GetAllNotificationDetail/{id}")]
        public List<UserNotificationModel> GetAllNotificationDetail(string id) {
            return _userNotification.GetNotificationWithAddversimentTitle(id).OrderByDescending(x => x.CreatedDate).ToList();
        }

        [HttpGet]
        [Route("GetUnReadNotification/{id}")]
        public int ReadAllNotification(string id) {
            return _userNotification.GetList(x => x.IsRead == false && x.UserId == id).Count;
        }

        private List<UserNotification> getNotifications(string userId) {
            return _userNotification.GetList(x => x.UserId == userId);
        }
    }
}