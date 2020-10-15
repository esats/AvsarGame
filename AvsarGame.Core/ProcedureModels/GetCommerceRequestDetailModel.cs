using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class GetCommerceRequestDetailModel {
        public string StatusDescription { get; set; }
        public string Title { get; set; }
        public string SellerUserId { get; set; }
        public string Seller { get; set; }
        public string SellerPhoneNumber { get; set; }
        public string BuyerUserId { get; set; }
        public string Buyer { get; set; }
        public string BuyerPhoneNumber { get; set; }
        public string GameName { get; set; }
        public double PriceWithComission { get; set; }
        public double Price { get; set; }
        public int AddversimentType { get; set; }
        public int AddversimentId { get; set; }
    }
}
