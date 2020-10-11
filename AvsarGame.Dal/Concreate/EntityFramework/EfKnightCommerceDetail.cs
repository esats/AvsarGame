using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Dapper;
using System;
using System.Data.SqlClient;
using AvsarGame.API.Models;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfKnightCommerceDetail : EfEntityRepositoryBase<KnightCommerceDetail, AvsarGameDBcontext>, IKnightCommerceDetail {
        public List<GetUserCommerceRequestDetailModel> GetUserCommerceRequestDetail(string userId) {
            using (var sqlConnection = new SqlConnection(Config.GetConnectionString())) {
                var parameter = new DynamicParameters();
                parameter.Add("userId", userId);

                return sqlConnection.Query<GetUserCommerceRequestDetailModel>("GetUserCommerceRequestDetail", parameter, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}
