using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using System.Linq.Dynamic;
namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfKnightCyberRing : EfEntityRepositoryBase<KnightCyberRing, AvsarGameDBcontext>, IKnightCyberRing {
        public IQueryable<KnightCyberRing> GetExampleQuery(AvsarGameDBcontext context) {
            var expression = GetExpression(context);

            // Store the filter as a dynamic query.
            return context.KnightCyberRing.Where(expression);
        }
        public List<string> GetImages(int addversimentId, int type) {
            using (var context = new AvsarGameDBcontext()) {
                context.KnightCyberRing.Where(x => "");
            }
        }

        protected Expression<Func<KnightCyberRing, bool>> GetExpression(AvsarGameDBcontext context) {
            var startTime = DateTimeOffset.Parse("2019-08-04");

            // We want to build the expression for the "Where" clause

            // Example of Query we will eventually run.
            // _context.FilmEntities.Where(f => _context.FilmTimeEntities.Any(ft => ft.FilmId == f.Id &amp;&amp; ft.StartTime >= startTime));

            var fParameter = Expression.Parameter(typeof(FilmEntity), "f"); // f =>

            // Create the FilmTime Entities Query
            var ftQueryExpression = context.Set<FilmTimeEntity>().AsQueryable().Expression; // _context.FilmTimeEntities

            // Build up the Any part of the query from Film Times
            var ftParameter = Expression.Parameter(typeof(FilmTimeEntity), "ft"); // ft =>
            var ftFilmIdProperty = Expression.Property(ftParameter, "FilmId"); // ft.FilmId
            var ftFilmIdEquals = Expression.Equal(ftFilmIdProperty, Expression.Property(fParameter, "Id")); // ft.FilmId == f.Id

            var ftStartTimeProperty = Expression.Property(ftParameter, "StartTime"); // ft.StartTime
            var ftStartTimeEquals = Expression.GreaterThanOrEqual(ftStartTimeProperty, Expression.Constant(startTime)); // ft.StartTime >= startTime

            // Builds up the AND expression
            var ftFullQueryExpression = Expression.AndAlso(ftFilmIdEquals, ftStartTimeEquals); // ft => ft.FilmId == f.Id &amp;&amp; ft.StartTime >= startTime

            // Make the Lambda Expression for Film Time
            var ftLambda = Expression.Lambda<Func<FilmTimeEntity, bool>>(ftFullQueryExpression, ftParameter);

            // Join in an ANY statement
            var anyMethod = typeof(Queryable).GetMethods().FirstOrDefault(method => method.Name == "Any" & amp;
            &amp;
            method.GetParameters().Count() == 2); // Use reflection to find the ANY method
            var anyFilmTimeMethod = anyMethod.MakeGenericMethod(typeof(FilmTimeEntity)); // Any is a generic method, so create a method specific to FilmTimeEntity

            var anyCall =
                    Expression.Call(anyFilmTimeMethod, ftQueryExpression,
                            ftLambda); // (f => _context.FilmTimeEntities.Any(ft => ft.FilmId == f.Id &amp;&amp; ft.StartTime >= startTime)

            return Expression.Lambda<Func<FilmEntity, bool>>(anyCall, fParameter);
        }
    }
}