using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models
{
    public class SearchModel
    {
        public List<SearchBasicModel> Games { get; set; }
        public List<SearchBasicModel> Categories { get; set; }
    }

    public class SearchBasicModel {
        public string Name { get; set; }
        public string SeoName { get; set; }
        public string CategorySeoName { get; set; }
        public string CategoryName { get; set; }
        public string ImgUrl { get; set; }
    }
}
