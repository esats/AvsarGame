using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AvsarGame.API.Models;
using AvsarGame.Core.DataAccess;
using AvsarGame.Entities.Entities;

namespace AvsarGame.Dal.Abstract {
    public interface IMetin2 : IEntityRepository<Metin2Item> {
        List<Metin2Item> GetFilterData(FilterDataModel filter);
    }
}