using AvsarGame.Core.DataAccess;
using AvsarGame.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.ProcedureModels;

namespace AvsarGame.Dal.Abstract {
    public interface IUserNotification : IEntityRepository<UserNotification> {
        List<UserNotificationModel> GetNotificationWithAddversimentTitle(string userId);
    }
}