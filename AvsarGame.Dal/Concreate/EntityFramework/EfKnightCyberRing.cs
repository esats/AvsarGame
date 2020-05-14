using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using System.Linq.Dynamic;
using AvsarGame.API.Models;
using Dapper;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfKnightCyberRing : EfEntityRepositoryBase<KnightCyberRing, AvsarGameDBcontext>, IKnightCyberRing {
        public List<KnightCyberRing> GetFilterData(FilterDataModel model) {
            using (var sqlConnection = new SqlConnection(Config.GetConnectionString())) {
                return sqlConnection.Query<KnightCyberRing>(GetSqlQuery(model)).ToList();
            }
        }

        private string GetSqlQuery(FilterDataModel model) {
            var sql = "SELECT * FROM KnightCyberRing";
            if (model.MinPrice > 0 || model.MaxPrice > 0 || !string.IsNullOrEmpty(model.CharacterFeature) || !string.IsNullOrEmpty(model.CharacterType)
                || !string.IsNullOrEmpty(model.Server) || !string.IsNullOrEmpty(model.Word)) {
                sql += " WHERE ";
                if (model.MinPrice > 0) {
                    sql += "Price >=" + model.MinPrice + " AND ";
                }

                if (model.MaxPrice > 0) {
                    sql += "Price <=" + model.MaxPrice + " AND ";
                }

                if (!string.IsNullOrEmpty(model.CharacterFeature)) {
                    sql += "CharacterFeature =" + "'" + model.CharacterFeature + "'" + " AND ";
                }

                if (!string.IsNullOrEmpty(model.CharacterType)) {
                    sql += "CharacterType =" + "'" + model.CharacterType + "'" + " AND ";
                }

                if (!string.IsNullOrEmpty(model.Server)) {
                    sql += "ServerName =" + "'" + model.Server + "'" + " AND ";
                }

                if (!string.IsNullOrEmpty(model.Word)) {
                    sql += "(Title like " + "'%" + model.Word + "%'" + " OR  Content like " + "'%" + model.Word + "%') AND ";
                }

                sql = sql.Substring(0, sql.Length - 4);
            }

            return sql + " " + model.OrderByDescription;
        }
    }
}