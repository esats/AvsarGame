using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models
{
    public class SessionForPaymentModel
    {
        public string Bearer { get; set; }
        public string UserId { get; set; }
        public string FullName { get; set; }
    }
}
