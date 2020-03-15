using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserOrderDetail: EntityBase<Guid>  {
        public Guid UserOrderId { get; set; }
        public Guid GameId { get; set; }
        public Guid Amount { get; set; }
    }
}