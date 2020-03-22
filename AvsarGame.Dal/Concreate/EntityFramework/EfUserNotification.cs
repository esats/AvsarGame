using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfUserNotification : EfEntityRepositoryBase<UserNotification, AvsarGameDBcontext>, IUserNotification {
    }
}