﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace AvsarGame.API.Models {
    public class CategoryModel : ModelBase<Guid> {
        public string Name { get; set; }
        public string SeoName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int Count { get; set; }
        public int Type { get; set; }
        public int OrderNo { get; set; }
        public bool IsUpdate { get; set; }

        [JsonIgnore]
        public IFormFile Image { get; set; }
    }
}