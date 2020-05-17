using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class SubComment : EntityBase<int> {
        public int CommentId { get; set; }
        public string UserId { get; set; }
        public string Content { get; set; }
    }
}