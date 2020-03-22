using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.DataAccess;
using AvsarGame.Entities.Entities;

namespace AvsarGame.Dal.Abstract {
    public interface IUserOrder : IEntityRepository<UserOrder> {
        List<UserOrder> GetUserOrder(string id);
    }
}