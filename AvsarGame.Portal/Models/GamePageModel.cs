using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;

namespace AvsarGame.Portal.Models {
    public class GamePageModel {
        public List<CategoryModel> Categories { get; set; }
        public List<GameModel> Games { get; set; }
    }
}