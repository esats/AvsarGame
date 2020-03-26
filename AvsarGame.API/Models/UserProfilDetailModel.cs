﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserProfilDetailModel {
        public UserBalanceModel Balance { get; set; }
        public List<UserNotificationModel> Notifications { get; set; }
        public List<UserOrdersModel>  UserOrders { get; set; }
        public int NotificationCount { get; set; }
    }
}