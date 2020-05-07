using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class KnightCyberRing : EntityBase<int> {
        public string UserId { get; set; }

        public ImageMaster Images { get; set; }
    }
}