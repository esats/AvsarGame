using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using System.Linq.Dynamic;
using AvsarGame.API.Models;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfKnightCyberRing : EfEntityRepositoryBase<KnightCyberRing, AvsarGameDBcontext>, IKnightCyberRing {
        public IQueryable<KnightCyberRing> GetFilterData(FilterDataModel model) {
            using (var context = new AvsarGameDBcontext()) {
                var expression = GetExpression(context, model);
                return context.KnightCyberRing.Where(expression);
            }
        }

        internal Expression<Func<KnightCyberRing, bool>> GetExpression(AvsarGameDBcontext context, FilterDataModel model) {
            var ftParameter = Expression.Parameter(typeof(KnightCyberRing), "x"); // ft =>

            var serverNameProperty = Expression.Property(ftParameter, "ServerName");

            var characterFeatureProperty = Expression.Property(ftParameter, "CharacterFeature");

            var characterTypeProperty = Expression.Property(ftParameter, "CharacterFeature");

            var minPriceProp = Expression.Property(ftParameter, "Price"); // ft.StartTime

            var maxPriceProp = Expression.Property(ftParameter, "Price"); // ft.StartTime

            BinaryExpression min = null;
            BinaryExpression max= null;
            BinaryExpression serverName= null;
            BinaryExpression characterType= null;
            BinaryExpression characterFeature= null;

            if (Math.Abs(model.MinPrice) > 0) {
                min = Expression.GreaterThanOrEqual(minPriceProp, Expression.Constant(model.MinPrice)); // ft.StartTime >= endTime
            }

            if (Math.Abs(model.MaxPrice) > 0) {
                max = Expression.LessThanOrEqual(maxPriceProp, Expression.Constant(model.MaxPrice));
            }

            if (!string.IsNullOrEmpty(model.Server)) {
                serverName = Expression.Equal(serverNameProperty, Expression.Constant(model.Server));
            }

            if (!string.IsNullOrEmpty(model.CharacterFeature)) {
                characterType = Expression.Equal(characterFeatureProperty, Expression.Constant(model.CharacterFeature));
            }

            if (!string.IsNullOrEmpty(model.CharacterType)) {
                characterFeature = Expression.Equal(characterTypeProperty, Expression.Constant(model.CharacterType));
            }

            //var methodInfo = typeof(string).GetMethod("Contains", new Type[] { typeof(string) }); // Contains Method
            //var member = Expression.Property(ftParameter, "Title"); //Cx.ay
            //var constant = Expression.Constant(model.Word);
            //Expression body = Expression.Call(Expression.Constant(model.Word), methodInfo, member);
            //var finalExpression2 = Expression.Lambda<Func<KnightCyberRing, bool>>(body, ftParameter);

            var finalExpression = Expression.AndAlso(min, max);
            var finalExpression2 = Expression.AndAlso(finalExpression, serverName);
            var finalExpression3 = Expression.AndAlso(finalExpression2, characterType);
            var finalExpression4 = Expression.AndAlso(finalExpression3, characterFeature);

            return Expression.Lambda<Func<KnightCyberRing, bool>>(finalExpression4, ftParameter);
        }
    }
}