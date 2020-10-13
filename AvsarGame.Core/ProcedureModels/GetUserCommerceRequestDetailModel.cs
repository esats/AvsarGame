using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class GetUserCommerceRequestDetailModel {
        public string StatusDescription { get; set; }
        public string Title { get; set; }
        public string Seller { get; set; }
        public string GameName { get; set; }
        public double PriceWithComission { get; set; }
    }
}
