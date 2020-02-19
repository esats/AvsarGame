using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Base {
    public abstract class SingletonBase<T>
            where T : SingletonBase<T>, new() {
        private static T _instance = new T();

        public static T Instance {
            get {
                return _instance;
            }
        }
    }
}