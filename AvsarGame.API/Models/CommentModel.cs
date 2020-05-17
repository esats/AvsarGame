using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class CommentModel {
        public string Content { get; set; }
        public int AddversimentId { get; set; }
        public int AddversimentType { get; set; }
        public int CommentId { get; set; }
        public int SubCommentId { get; set; }
        public UserSummaryModel User { get; set; }
    }
}