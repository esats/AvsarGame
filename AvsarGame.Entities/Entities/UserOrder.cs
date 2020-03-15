using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserOrder : EntityBase<Guid> {
        public Guid UserId { get; set; }
        public ICollection<UserOrderDetail> OrderDetail { get; set; }
    }
}