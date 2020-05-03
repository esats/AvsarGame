using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AvsarGame.API.Models
{
    public class KnightCyberRingAddversimentModel
    {
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
        public List<IFormFile> Files { get; set; }
    }
}
