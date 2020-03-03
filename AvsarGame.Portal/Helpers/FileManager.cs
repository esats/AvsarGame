using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using Microsoft.AspNetCore.Http;

namespace AvsarGame.Portal.Helpers {
    public class FileManager : SingletonBase<FileManager> {
        public string Save(IFormFile file) {
            Guid id = Guid.NewGuid();
            var path = Path.Combine(
                    "wwwroot", "Uploads"
            );

            var pathToData = Path.GetFullPath(Path.Combine(path, id + "-" + file.FileName));
            using (var stream = new FileStream(pathToData, FileMode.Create)) {
                file.CopyToAsync(stream).Wait();
            }

            return id + "-"+ file.FileName;
        }
    }
}