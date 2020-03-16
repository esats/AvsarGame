using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfLog : ILog {
        public void insert(Log log) {
            using (var context = new AvsarGameDBcontext()) {
                var addedEntity = context.Entry(log);
                addedEntity.State = EntityState.Added;
                context.SaveChangesAsync();
            }
        }
    }
}