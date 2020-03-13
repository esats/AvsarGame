using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace AvsarGame.API.Models {
    public class GameModel : ModelBase<Guid> {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Name { get; set; }
        public string SeoName { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public bool IsPriceChange { get; set; }
        public int Type { get; set; }
        public decimal SellPrice { get; set; }
        public decimal BuyPrice { get; set; }
        public string Count { get; set; }

        [JsonIgnore]
        public IFormFile Image { get; set; }
    }
}