using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class MailTemplateModel {
        public List<UserOrderDetailModel> Orders;
        public UserPaymentManagementModel UserModel { get; set; }
    }
}