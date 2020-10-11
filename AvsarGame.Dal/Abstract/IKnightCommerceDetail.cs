using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.API.Models;
using AvsarGame.Core.DataAccess;
using AvsarGame.Entities.Entities;

namespace AvsarGame.Dal.Abstract {
    public interface IKnightCommerceDetail : IEntityRepository<KnightCommerceDetail> {
        List<GetUserCommerceRequestDetailModel> GetUserCommerceRequestDetail(string userId);
    }
}
