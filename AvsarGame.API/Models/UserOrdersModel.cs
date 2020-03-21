﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserOrdersModel {
        public Guid UserId { get; set; }
        public ICollection<UserOrderDetailModel> Orders { get; set; }
    }
}