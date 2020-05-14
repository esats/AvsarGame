using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace AvsarGame.Portal.Models {
    public class BaseFilterModel {
        public BaseFilterModel() {
            Servers = new List<SelectListItem>() {
                    new SelectListItem() { Value = "Ares", Text = "Ares" },
                    new SelectListItem() { Value = "Diez", Text = "Diez" },
                    new SelectListItem() { Value = "Rosetta", Text = "Rosetta" },
                    new SelectListItem() { Value = "Destan", Text = "Destan" },
                    new SelectListItem() { Value = "Vega", Text = "Vega" },
                    new SelectListItem() { Value = "Altar", Text = "Altar" },
                    new SelectListItem() { Value = "Olympia", Text = "Olympia" },
                    new SelectListItem() { Value = "Gordion", Text = "Gordion" }
            };
            CharacterFeature = new List<SelectListItem>() {
                    new SelectListItem() { Value = "Karus", Text = "Karus" },
                    new SelectListItem() { Value = "Human", Text = "Human" }
            };
            CharacterType = new List<SelectListItem>() {
                    new SelectListItem() { Value = "Mage", Text = "Mage" },
                    new SelectListItem() { Value = "Warrior", Text = "Warrior" }
            };

            OrderBy = new List<SelectListItem>() {
                    new SelectListItem() { Value = "0", Text = "Artan Fiyat" },
                    new SelectListItem() { Value = "1", Text = "Azalan Fiyat" },
                    new SelectListItem() { Value = "2", Text = "Tarihe Göre En Yeni" },
                    new SelectListItem() { Value = "3", Text = "Tarihe Göre En Eski" }
            };
        }

        public List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> Data { get; set; }
        public List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> DataKnightItem { get; set; }
        public FilterDataModel Filter { get; set; }
        public List<SelectListItem> Servers { get; set; }
        public List<SelectListItem> CharacterFeature { get; set; }
        public List<SelectListItem> CharacterType { get; set; }
        public List<SelectListItem> OrderBy { get; set; }
    }
}