﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserPaymentRequestControlModel {
        public Guid UserId { get; set; }
        public int RequestId { get; set; }
    }
}