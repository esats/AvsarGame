using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfUserSell : EfEntityRepositoryBase<UserSell, AvsarGameDBcontext>, IUserSell {
        public List<UserSell> GetUserSell(string id) {
            using (var context = new AvsarGameDBcontext()) {
               return id == null ? context.UserSell.Include(x=>x.Sells).ToList() 
                                 : context.UserSell.Include(x=>x.Sells).Where(x=>x.UserId == id).ToList();
            }
        }
    }
}