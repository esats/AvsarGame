using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class BaseAdversimentModel<T1,T2> {
        public BaseAdversimentModel(T1 value1, T2 value2) {
            this.Base = value1;
            this.Sub = value2;
        }

        public BaseAdversimentModel() {
      
        }
        public T1 Base { get; set; }
        public T2 Sub { get; set; }

    }
}