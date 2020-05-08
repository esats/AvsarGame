using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace AvsarGame.API.Models {
    public class KnightItemAddversimentModel {
        public string Title { get; set; }
        public string Content { get; set; }
        public string ServerName { get; set; }
        public string CharacterFeature { get; set; }
        public string CharacterType { get; set; }
        public int Level { get; set; }
        public int Percent { get; set; }
        public double Price { get; set; }
        public string SellTimeEarly { get; set; }
        public string SellTimeLate { get; set; }
        public string CreatedBy { get; set; }
        public int ImageMasterId { get; set; }
        public string UserId { get; set; }

        [JsonIgnore]
        public List<IFormFile> Files { get; set; }
    }
}