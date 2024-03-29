﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace AvsarGame.API.Models {
    public class KnightItemAddversimentModel {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ServerName { get; set; }
        public double Price { get; set; }
        public string SellTimeEarly { get; set; }
        public string SellTimeLate { get; set; }
        public string Plus { get; set; }
        public string CreatedBy { get; set; }
        public int ImageMasterId { get; set; }
        public string UserId { get; set; }
        public string Reverse { get; set; }
        public List<string> FileUrls { get; set; }

        [JsonIgnore]
        public List<IFormFile> Files { get; set; }
    }
}