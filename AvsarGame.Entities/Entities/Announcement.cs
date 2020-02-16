using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class Announcement : EntityBase<Guid> {
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
    }
}