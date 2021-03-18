using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class GetUserCommerceRequestDetailModel {
        public string StatusDescription { get; set; }
        public string Title { get; set; }
        public string TransactionTime { get; set; }
        public string GameName { get; set; }
        public double PriceWithComission { get; set; }
    }
}
