using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserProfilDetailModel {
        public UserBalanceModel Balance { get; set; }
        public int Notifications { get; set; }
    }
}