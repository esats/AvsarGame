using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserOrder : EntityBase<int> {
        public string UserId { get; set; }
        public ICollection<UserOrderDetail> Orders { get; set; }
    }
}