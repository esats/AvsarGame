using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class ImageMaster : EntityBase<int> {
        public int AdversimentId { get; set; }
        public int Type { get; set; }
        public ICollection<ImagesDetail> Images { get; set; }
    }
}