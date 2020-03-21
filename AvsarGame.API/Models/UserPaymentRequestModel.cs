using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserPaymentRequestModel {
        public string PaymentRequestCode { get; set; }
        public Guid UserId { get; set; }
        public string PrimitivePaymentType { get; set; }
        public int Bank { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public UserManagementModel UserModel { get; set; }
    }
}