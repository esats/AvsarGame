﻿using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserBalanceDetail : EntityBase<Guid> {
        public Guid UserBalanceId { get; set; }
        public int TransactionDescription { get; set; }
        public decimal Amount { get; set; }
        public int UserOrderDetailId { get; set; }
    }

    public enum TRANSACTION_DESCIPTION {
        GAME_MONEY_ORDER = 0,
        ITEM_ORDER = 1,
        Payment = 2
    }
}