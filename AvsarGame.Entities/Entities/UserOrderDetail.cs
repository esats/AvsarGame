﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserOrderDetail : EntityBase<int> {
        public int UserOrderId { get; set; }
        public Guid GameId { get; set; }
        public string CharacterName { get; set; }
        public decimal BillingPrice { get; set; }
        public decimal BillingAmount { get; set; }
        public int OrderStatus { get; set; } = 0;
        public string Code { get; set; } 
    }
}