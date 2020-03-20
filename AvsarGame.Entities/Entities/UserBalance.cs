using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserBalance : EntityBase<Guid> {
        public ApplicationUser User { get; set; }
        public decimal Balance { get; set; }
    }
}