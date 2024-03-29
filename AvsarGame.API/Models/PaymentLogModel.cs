﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class PaymentLogModel {
        public int Id { get; set; }
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
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int PaymentDistributor { get; set; }
        public int TransferedUsersBalanceStatus { get; set; } = 1;
    }
}
