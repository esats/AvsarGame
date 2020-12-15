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
    public class EfCategory : EfEntityRepositoryBase<Category, AvsarGameDBcontext>, ICategory {
        public List<Category> GetCategoriesByFilter(FilterDataModel filter) {
            using (var sqlConnection = new SqlConnection(Config.GetConnectionString())) {
                return sqlConnection.Query<Category>(GetSqlQuery(filter)).ToList();
            }
        }

        private string GetSqlQuery(FilterDataModel model) {
            return  "SELECT * FROM Categories where IsActive = 1";
        }
    }
}