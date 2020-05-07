using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class ImagesDetail : EntityBase<int> {
        public int ImageMasterId { get; set; }
        public string ImageUrl { get; set; }
    }
}