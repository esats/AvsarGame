using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class Category : EntityBase<Guid> {
        public string Name { get; set; }
        public string SeoName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Count { get; set; }
        public int Type { get; set; }
        public int OrderNo { get; set; }
    }
}