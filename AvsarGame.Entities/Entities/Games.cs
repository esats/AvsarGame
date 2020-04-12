using AvsarGame.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AvsarGame.Entities.Entities {
    public class Games : EntityBase<Guid> {
        public string Name { get; set; }
        public string SeoName { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public bool IsPriceChange { get; set; }
        public int Type { get; set; }
        public decimal SellPrice { get; set; }
        public decimal BuyPrice { get; set; }
        public int Count { get; set; }
        public bool SellButtonEnabled { get; set; }
        public bool BuyButtonEnabled { get; set; }
        public int OrderNo { get; set; }
        public Guid CategoryId { get; set; }
    }
}