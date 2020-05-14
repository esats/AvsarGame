using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class FilterDataModel {
        public string Server { get; set; }
        public string CharacterFeature { get; set; }
        public string CharacterType { get; set; }
        public string Plus { get; set; }
        public double MinPrice { get; set; }
        public double MaxPrice { get; set; }
        public string Word { get; set; }
        public int OrderBy { get; set; }
        public string OrderByDescription { get; set; }
    }
}