using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/Image")]
    [ApiController]
    public class ImageController : APIControllerBase {
        private readonly IImageMaster _imageMaster;
        private readonly IImageDetail _imagesDetail;

        public ImageController(IImageMaster imageMaster, IImageDetail imagesDetail) {
            _imageMaster = imageMaster;
            _imagesDetail = imagesDetail;
        }

        [HttpPost]
        [Route("Add")]
        public int Add(ImageMasterModel model) {
            ImageMaster entity = new ImageMaster();
            entity.AdversimentId = model.AdversimentId;
            entity.Type = model.Type;
            var oldRecord = _imageMaster.GetT(x => x.AdversimentId == model.AdversimentId && x.Type == model.Type && x.IsActive == true);
            oldRecord.IsActive = false;
            _imageMaster.Update(oldRecord);
            entity.CreatedDate  = DateTime.Now;
            entity.CreatedBy = base.GetUser();
            return _imageMaster.Add(entity).Id;
        }

        [HttpPost]
        [Route("AddImageDetail")]
        public void AddImageDetail(ImagesDetailModel model) {
            ImagesDetail entity = new ImagesDetail();
            entity.ImageMasterId = model.ImageMasterId;
            entity.ImageUrl = model.ImageUrl;
            entity.CreatedDate  = DateTime.Now;
            entity.CreatedBy = base.GetUser();
            _imagesDetail.Add(entity);
        }
    }
}