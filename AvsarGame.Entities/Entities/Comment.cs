using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class Comment : EntityBase<int> {
        public string Content { get; set; }
        public int AddversimentId { get; set; }
        public int AddversimentType { get; set; }
        public override DateTime? ModifiedDate { get; set; } = DateTime.Now;
        public ICollection<SubComment> SubComments { get; set; }
    }
}