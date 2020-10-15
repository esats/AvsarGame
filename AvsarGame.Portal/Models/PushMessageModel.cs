using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.Portal.Models {
    public class PushMessageModel {
        public string PhoneNumber { get; set; }
        public string UserId { get; set; }
        public bool IsSeller { get; set; }
    }
}
