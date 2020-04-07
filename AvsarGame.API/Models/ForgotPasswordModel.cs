using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models
{
    public class ForgotPasswordModel
    {
        public string Email { get; set; }
        public string RequestSchema { get; set; }
    }
}
