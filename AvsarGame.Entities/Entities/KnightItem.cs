using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class KnightItem : EntityBase<int> {
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ServerName { get; set; }
        public string CharacterFeature { get; set; }
        public string CharacterType { get; set; }
        public int Level { get; set; }
        public int Percent { get; set; }
        public double Price { get; set; }
        public string SellTimeEarly { get; set; }
        public string SellTimeLate { get; set; }
        public string Plus { get; set; }
        public string Reverse { get; set; }
        public override DateTime? CreatedDate { get; set; } = DateTime.Now;
        public override string CreatedBy { get; set; }
        public int Status { get; set; } = (int) AddversimentStatus.SUSPEND;
        public ImageMaster Images { get; set; }
    }
}