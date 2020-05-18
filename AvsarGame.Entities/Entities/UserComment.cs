using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserComment : EntityBase<int> {
        public string UserId { get; set; }
        public int CommentId { get; set; }
        public bool IsSubComment { get; set; }
    }
}