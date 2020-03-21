using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserPaymentRequest : EntityBase<int> {
        public string PaymentRequestCode { get; set; }
        public Guid UserId { get; set; }
        public string PrimitivePaymentType { get; set; }
        public int Bank { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
    }
}   