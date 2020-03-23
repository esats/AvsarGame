using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfUserBalance : EfEntityRepositoryBase<UserBalance, AvsarGameDBcontext>, IUserBalance {
        public UserBalance GetBalance(string userId) {
            using (var context = new AvsarGameDBcontext()) {
                return context.UserBalance.Include(x=>x.User).Include(x => x.Details).FirstOrDefault(x => x.User.Id == userId);
            }
        }
    }
}