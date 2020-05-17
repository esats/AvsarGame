using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.DataAccess;
using AvsarGame.Entities.Entities;

namespace AvsarGame.Dal.Abstract {
    public interface IComment : IEntityRepository<Comment> {
        List<Comment> GetCommentWithSubComments(int addversimentId, int addversimentType);
        List<string> GetNotificationList(int commentId, int addversimentType, int subCommentId = 0);
    }
}