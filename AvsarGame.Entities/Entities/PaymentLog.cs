using AvsarGame.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AvsarGame.Entities.Entities {
    public class PaymentLog : EntityBase<int> {
        public string UserId { get; set; }
        public string OrderId { get; set; }
        public int Result { get; set; }
        public string Hash { get; set; }
        public string IpAddress { get; set; }
        public string M5val { get; set; }
        public string SystemMessage { get; set; }
        public string ErrorMessage { get; set; }
        public decimal Amount { get; set; }
        public decimal AmountWithComission { get; set; }
        public decimal ComingAmount { get; set; }
        public bool IsIncoming { get; set; }
        public string PaymentMethod { get; set; }
        public int PaymentDistributor { get; set; }
        public int TransferedUsersBalanceStatus { get; set; } 
    }
}
