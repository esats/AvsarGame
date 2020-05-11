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
        public IQueryable<KnightCyberRing> GetFilterData(FilterDataModel model) {
           
            using (var sqlConnection = new SqlConnection("Server=.;database=AvsarGame;Trusted_Connection=True;MultipleActiveResultSets=true;Connect Timeout=150")) {
                var mod2el = 
                        sqlConnection.Query<KnightCyberRing>("select * from KnightCyberRing");
                

            }

            return null;
        }
    }
}