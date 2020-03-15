using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class Log : EntityBase<Guid> {
        public Guid UserId { get; set; }
        public Guid UserOrderId { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public string Message { get; set; }
    }
}