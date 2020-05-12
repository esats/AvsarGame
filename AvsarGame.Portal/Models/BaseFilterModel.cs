using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;

namespace AvsarGame.Portal.Models
{
    public class BaseFilterModel
    {
        public List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> Data { get; set; }
        public List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> DataKnightItem { get; set; }
        public FilterDataModel Filter { get; set; }
    }
}
