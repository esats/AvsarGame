using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;

namespace AvsarGame.Portal.Models {
    public class BaseFilterModel {
        public BaseFilterModel() {
            Servers = new List<string>() {
                    "Ares", "Diez", "Rosetta", "Destan", "Vega", "Altar", "Olympia", "Gordion"
            };
            CharacterFeature = new List<string>() {
                    "Human", "Karus""Human/Karus"
            };
            CharacterType = new List<string>() {
                    "Mage", "Warrior"
            };
        }

        public List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> Data { get; set; }
        public List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> DataKnightItem { get; set; }
        public FilterDataModel Filter { get; set; }
        public List<string> Servers { get; set; }
        public List<string> CharacterFeature { get; set; }
        public List<string> CharacterType { get; set; }
    }
}