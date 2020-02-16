using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class Campaign : EntityBase<Guid> {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string ImageUrl { get; set; }
    }
}