using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class ResetPasswordModel {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string Error { get; set; }
    }
}