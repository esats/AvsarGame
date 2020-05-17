using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfSubComment : EfEntityRepositoryBase<SubComment, AvsarGameDBcontext>, ISubComment {
    }
}