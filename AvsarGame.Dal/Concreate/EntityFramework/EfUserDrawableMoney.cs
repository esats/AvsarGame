using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AvsarGame.Dal.Concreate.EntityFramework
{
    public class EfUserDrawableMoney: EfEntityRepositoryBase<UserDrawableMoney,AvsarGameDBcontext>, IUserDrawableMoney
    {
    }
}
