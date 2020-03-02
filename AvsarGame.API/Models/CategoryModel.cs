﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using Microsoft.AspNetCore.Http;
using Nancy.Json;
using Newtonsoft.Json;

namespace AvsarGame.API.Models {
    public class CategoryModel : ModelBase<Guid> {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Count { get; set; }
        [JsonIgnore]
        public IFormFile Image { get; set; }
    }
}