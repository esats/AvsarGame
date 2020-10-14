using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class UserOrderDetailModel {
        public int Id { get; set; } 
        public int UserOrderId { get; set; }
        public GameModel Game { get; set; }
        public Guid GameId { get; set; }
        public string CharacterName { get; set; }
        public decimal BillingPrice { get; set; }
        public decimal BillingAmount { get; set; }
        public int OrderStatus { get; set; } 
        public DateTime? CreatedDate { get; set; }
    }
}                    
