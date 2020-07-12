using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using AvsarGame.API.Models;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Dapper;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfMetin2 : EfEntityRepositoryBase<Metin2Item, AvsarGameDBcontext>, IMetin2 {
        public List<Metin2Item> GetFilterData(FilterDataModel model) {
            using (var sqlConnection = new SqlConnection(Config.GetConnectionString())) {
                return sqlConnection.Query<Metin2Item>(GetSqlQuery(model)).ToList();
            }
        }

        private string GetSqlQuery(FilterDataModel model) {
            var sql = "SELECT * FROM KnightItem";
            if (model.MinPrice > 0 || model.MaxPrice > 0 || !string.IsNullOrEmpty(model.Plus)
                || !string.IsNullOrEmpty(model.Server) || !string.IsNullOrEmpty(model.Word)) {
                sql += " WHERE ";
                if (model.MinPrice > 0) {
                    sql += "Price >=" + model.MinPrice + " AND ";
                }

                if (model.MaxPrice > 0) {
                    sql += "Price <=" + model.MaxPrice + " AND ";
                }

                if (!string.IsNullOrEmpty(model.Plus)) {
                    sql += "CharacterType =" + "'" + model.Plus + "'" + " AND ";
                }

                if (!string.IsNullOrEmpty(model.Server)) {
                    sql += "ServerName =" + "'" + model.Server + "'" + " AND ";
                }

                if (!string.IsNullOrEmpty(model.Word)) {
                    sql += "(Title like " + "'%" + model.Word + "%'" + " OR  Content like " + "'%" + model.Word + "%') AND ";
                }

                sql += "IsActive =1"; 
            } else {
                sql += " WHERE IsActive = 1 AND Status = 1";
            }


            return sql + " " + model.OrderByDescription;
        }
    }
}