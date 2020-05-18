using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Core.ProcedureModels;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Dapper;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfUserNotification : EfEntityRepositoryBase<UserNotification, AvsarGameDBcontext>, IUserNotification {
        public List<UserNotificationModel> GetNotificationWithAddversimentTitle(string userId) {
            using (var sqlConnection = new SqlConnection(Config.GetConnectionString())) {
                var parameter = new DynamicParameters();
                parameter.Add("userId", userId);

                return sqlConnection.Query<UserNotificationModel>("GetNotificationWithAddversimentTitle", parameter, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}