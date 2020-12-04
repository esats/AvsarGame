using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserBalanceDetail : EntityBase<Guid> {
        public Guid UserBalanceId { get; set; }
        public int TransactionDescription { get; set; }
        public decimal Amount { get; set; }
        public int UserOrderDetailId { get; set; }
        public string OrderId { get; set; }
        public int AddversimentId { get; set; }
        public int AddversimentType { get; set; }
    }

    public enum TRANSACTION_DESCIPTION {
        GAME_MONEY_ORDER = 0,
        KNIGHT_ITEM_ORDER = 1,
        Payment = 2,
        ORDER_REJECT = 3,
        GAME_MONEY_SELL= 4,
        MONEY_DRAW = 5,
        MONEY_DRAW_REVERSE_CHARGE = 6
    }
}