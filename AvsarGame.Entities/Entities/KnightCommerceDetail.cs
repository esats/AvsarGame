using AvsarGame.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AvsarGame.Entities.Entities {
    public class KnightCommerceDetail : EntityBase<int> {
        public int AddversimentId { get; set; }
        public int AddversimentType { get; set; }
        public double PriceWithComission { get; set; }
        public string UserId { get; set; }
        public string TransferedCharacter { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public int Status { get; set; }
    }
}
