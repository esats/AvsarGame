using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Dapper;

namespace AvsarGame.Dal.Concreate.EntityFramework
{
    public class EfUserDrawableMoney: EfEntityRepositoryBase<UserDrawableMoney,AvsarGameDBcontext>, IUserDrawableMoney
    {
        public decimal GetUserDrawableMoney(Guid userBalanceId)
        {
            using (var sqlConnection = new SqlConnection(Config.GetConnectionString()))
            {
                var parameter = new DynamicParameters();
                parameter.Add("userBalanceId", userBalanceId);

                return sqlConnection.QueryFirstOrDefault<decimal>("GetUserDrawableBalance", parameter, commandType: CommandType.StoredProcedure)
            }
        }
    }
}
