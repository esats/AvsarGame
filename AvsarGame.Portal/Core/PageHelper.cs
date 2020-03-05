using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.Portal.Core {
    public static class PageHelper {
        public static string GetModalId(Guid id) {
            var modalId = "category" + id;
            return modalId;
        }
    }
}