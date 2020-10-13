using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class CommerceModel {
        public int AddversimentId { get; set; }
        public int AddversimentType { get; set; }
        public double PriceWithComission { get; set; }
        public string UserId { get; set; }
        public string SellerUserId { get; set; }
        public string TransferedCharacter { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public int Status { get; set; }
    }
}
