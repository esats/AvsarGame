using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserBalanceModel {
        public string UserId { get; set; }
        public decimal Balance { get; set; }
    }
}