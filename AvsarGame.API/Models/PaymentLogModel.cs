using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class PaymentLogModel {
        public string UserId { get; set; }
        public string OrderId { get; set; }
        public int Result { get; set; }
        public string Hash { get; set; }
        public string IpAddress { get; set; }
        public string M5val { get; set; }
        public string SystemMessage { get; set; }
        public string ErrorMessage { get; set; }
        public double Amount { get; set; }
        public double AmountWithComission { get; set; }
        public double ComingAmount { get; set; }
        public bool IsIncoming { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime Date { get; set; }
    }
}
