using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.Dal.Concreate.EntityFramework;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Http;

namespace AvsarGame.API.Base {
    public class Logger : SingletonBase<Logger> {
        private EfLog _log;

        public EfLog _Log {
            get {
                if (_log == null) {
                    _log = new EfLog();
                }
                return _log;
            }
        }

        public void Insert(Log log) {
            _Log.insert(log);
        }
    }
}