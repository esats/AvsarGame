﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfUserBalance : EfEntityRepositoryBase<UserBalance, AvsarGameDBcontext>, IUserBalance {
        //public List<UserOrder> GetUserOrder(Guid? id) {
        //    using (var context = new AvsarGameDBcontext()) {
        //       return id == null ? context.UserOrder.Include(x=>x.Orders).ToList() 
        //                         : context.UserOrder.Include(x=>x.Orders).Where(x=>x.UserId == id).ToList();
        //    }
        //}
    }
}