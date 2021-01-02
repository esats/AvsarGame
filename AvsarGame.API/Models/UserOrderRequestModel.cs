using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserOrderRequestModel {
        public string UserId { get; set; }
        public int OrderId { get; set; }
        public string Code { get; set; }
    }
}