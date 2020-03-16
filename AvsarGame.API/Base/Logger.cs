using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.Dal.Concreate.EntityFramework;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Http;

namespace AvsarGame.API.Base {
    public class Logger : SingletonBase<Logger> {
        private readonly EfLog _log;

        public Logger() {
            _log = new EfLog();
        }

        public void Insert(Log log) {
            _log.insert(log);
        }
    }
}