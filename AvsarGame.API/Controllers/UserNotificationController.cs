﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
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
            return getNotifications(id).Count(x => x.IsRead == false);
        }

        [HttpGet]
        [Route("GetAllNotificationDetail/{id}")]
        public List<UserNotificationModel> GetAllNotificationDetail(string id) {
            var notifications = _mapper.Map<List<UserNotificationModel>>(getNotifications(id)).OrderByDescending(x=>x.CreatedDate);
            return notifications.ToList();
        }

        [HttpGet]
        [Route("ReadAllNotification/{id}")]
        public void ReadAllNotification(string id) {
            var notifications = getNotifications(id).Where(x => x.IsRead == false).ToList();
            foreach (var item in notifications) {
                item.IsRead = true;
                _userNotification.Update(item);
            }
        }

        private List<UserNotification> getNotifications(string userId) {
            return _userNotification.GetList(x => x.UserId == userId);
        }
    }
}