using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.DataAccess;
using AvsarGame.Entities.Entities;

namespace AvsarGame.Dal.Abstract {
    public interface IImageMaster : IEntityRepository<ImageMaster> {
        List<string> GetImages(int addversimentId,int type);
    }
}