using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserBalance : EntityBase<Guid> {
        public UserBalance() {
            User = new ApplicationUser();
        }

        public ApplicationUser User { get; set; }
        public decimal Balance { get; set; }
        public ICollection<UserBalanceDetail> Details { get; set; }
    }
}