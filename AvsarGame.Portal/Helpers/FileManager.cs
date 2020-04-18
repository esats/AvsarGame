using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.Portal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage.Blob;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

namespace AvsarGame.Portal.Helpers {
    public class FileManager : SingletonBase<FileManager> {
        public async Task<string> Save(IFormFile file) {
            Guid id = Guid.NewGuid();
            var fileName = id + file.FileName;

            var path = Path.Combine(
                    "wwwroot", "Uploads"
            );

            BlobManager manager = new BlobManager();
            CloudBlobContainer container = await manager.CreateFolderAsync();

;           var pathToData1520 = Path.GetFullPath(Path.Combine(path, "1520x500", fileName));
            var pathToData255 = Path.GetFullPath(Path.Combine(path, "255x270", fileName));
            var pathToData180 = Path.GetFullPath(Path.Combine(path, "305x500", fileName));
            var pathToData213 = Path.GetFullPath(Path.Combine(path, "213x207", fileName));
            var pathToDataOrg = Path.GetFullPath(Path.Combine(path, "orj", fileName));

            using (var stream = new FileStream(pathToDataOrg, FileMode.Create)) {
                file.CopyTo(stream);
                stream.Dispose();
                await SaveToCloud(container, manager,
                        new CloudModel() { OrginalFile = pathToDataOrg, FilePath = pathToData1520, Width = 1520, Height = 500, SubFolderName = "1520x500",FileName = fileName});
                await SaveToCloud(container, manager,
                        new CloudModel() { OrginalFile = pathToDataOrg, FilePath = pathToData255, Width = 255, Height = 270, SubFolderName = "255x270",FileName = fileName });
                await SaveToCloud(container, manager,
                        new CloudModel() { OrginalFile = pathToDataOrg, FilePath = pathToData180, Width = 305, Height = 500, SubFolderName = "350x500",FileName = fileName });
                await SaveToCloud(container, manager,
                        new CloudModel() { OrginalFile = pathToDataOrg, FilePath = pathToData213, Width = 213, Height = 207, SubFolderName = "213x207",FileName = fileName });
            }

            return fileName;
        }

        public async Task<string> SaveToCloud(CloudBlobContainer container, BlobManager manager, CloudModel model) {
            using (Image image = Image.Load(model.OrginalFile)) {
                image.Mutate(x =>
                        x.Resize(model.Width, model.Height)
                );
                image.Save(model.FilePath, new JpegEncoder() { Quality = 100 });

                await manager.UploadFileAsync(container, model);
            }

            return "";
        }
    }
}