using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.Core;

namespace AvsarGame.API.Models {
    public class UserPaymentRequestModel {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string PrimitivePaymentType { get; set; }
        public Banks Bank { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}