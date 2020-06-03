using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserOrderResponseModel {
        public string Message { get; set; }
        public string RedirectUrl { get; set; }
        public int Error { get; set; }
    }

    public enum Errors {
        UNAUTHORIZED = 0,
        OUTOFBALANCE = 1
    }
}