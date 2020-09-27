using AvsarGame.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserPaymentHistoryModel {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PaymentDistributor { get; set; }
        public string PhoneNumber { get; set; }
        public string OrderId { get; set; }
        public decimal Amount { get; set; }
        public decimal AmountWithCommission { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string IpAddress { get; set; }
        public string Result { get; set; }
    }
}
