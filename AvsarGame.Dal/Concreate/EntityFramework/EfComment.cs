using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Dapper;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfComment : EfEntityRepositoryBase<Comment, AvsarGameDBcontext>, IComment {
        public List<Comment> GetCommentWithSubComments(int addversimentId, int addversimentType) {
            using (var context = new AvsarGameDBcontext()) {
                return context.Comment.Include(x => x.SubComments).Where(x => x.AddversimentId == addversimentId && x.AddversimentType == addversimentType).ToList();
            }
        }

        public List<string> GetNotificationList(int addversimentId, int addversimentType, int subCommentId = 0) {
            using (var sqlConnection = new SqlConnection(Config.GetConnectionString())) {
                var parameter = new DynamicParameters();
                parameter.Add("AddversimentId", addversimentId);
                parameter.Add("AddversimentType", addversimentType);
                parameter.Add("SubCommentId", subCommentId);

                return sqlConnection.Query<string>("GetNotificationList", parameter, commandType: CommandType.StoredProcedure).ToList();
            }
        }
    }
}