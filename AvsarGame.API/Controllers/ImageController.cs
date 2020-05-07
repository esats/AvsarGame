using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers
{
    [Route("api/Image")]
    [ApiController]
    public class ImageController : APIControllerBase
    {
        public ImageController() {
            
        }

        [HttpPost]
        public int Add(ImageMasterModel model) {

            return 1;
        }
    }
}