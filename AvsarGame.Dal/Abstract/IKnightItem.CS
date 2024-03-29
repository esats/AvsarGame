﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AvsarGame.API.Models;
using AvsarGame.Core.DataAccess;
using AvsarGame.Entities.Entities;

namespace AvsarGame.Dal.Abstract {
    public interface IKnightItem : IEntityRepository<KnightItem> {
        List<KnightItem> GetFilterData(FilterDataModel filter);

    }
}