using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models
{
    public class CategoryGameModel
    {
        public CategoryGameModel() {
            Category = new CategoryModel();
            Games = new List<GameModel>();
        }
        public CategoryModel Category { get; set; }
        public List<GameModel> Games { get; set; }
    }
}
