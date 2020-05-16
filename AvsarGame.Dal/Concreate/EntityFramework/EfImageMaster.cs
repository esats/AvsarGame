using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AvsarGame.Core.DataAccess.EntityFramework;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class EfImageMaster : EfEntityRepositoryBase<ImageMaster, AvsarGameDBcontext>, IImageMaster {
        public List<string> GetImages(int addversimentId, int type) {
            using (var context = new AvsarGameDBcontext()) {
                return context.ImageMaster
                              .Include(x => x.Images)
                              .FirstOrDefault(x => x.Type == type && x.AdversimentId == addversimentId && x.IsActive)
                              ?.Images.Select(x => x.ImageUrl).ToList();
            }
        }
    }
}