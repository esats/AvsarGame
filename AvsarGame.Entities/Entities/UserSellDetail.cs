﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserSellDetail : EntityBase<int> {
        public int UserSellId { get; set; }
        public Guid GameId { get; set; }
        public string CharacterName { get; set; }
        public decimal BillingPrice { get; set; }
        public decimal BillingAmount { get; set; }
        public int OrderStatus { get; set; } = 0;
    }

    public enum ORDER_STATUS {
        [Description("Beklemede")]
        PENDING = 0,

        [Description("Aktarıldı")]
        APPROVED = 1,

        [Description("Reddedildi")]
        REJECT = 2
    }
}