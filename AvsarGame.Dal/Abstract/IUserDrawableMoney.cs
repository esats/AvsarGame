using AvsarGame.Core.DataAccess;
using AvsarGame.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.API.Models;

namespace AvsarGame.Dal.Abstract
{
    public interface IUserDrawableMoney : IEntityRepository<UserDrawableMoney>
    {
        decimal GetUserDrawableMoney(Guid userBalanceId);
    }
}