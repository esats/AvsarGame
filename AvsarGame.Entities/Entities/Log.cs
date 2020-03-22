using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class Log : EntityBase<Guid> {
        public string UserId { get; set; }
        public Guid UserOrderId { get; set; }
        public string Path { get; set; }
        public string Message { get; set; }
        public override DateTime? CreatedDate { get; set; } = DateTime.Now;
    }
}