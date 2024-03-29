﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Core;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
    //foto bul ve para çekme test et  
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

            var EXTRALARGE = Path.GetFullPath(Path.Combine(path, PageHelper.Description(ImageFolder.EXTRALARGE), fileName));
            var LARGE = Path.GetFullPath(Path.Combine(path, PageHelper.Description(ImageFolder.LARGE), fileName));
            var LARGE_MAIN = Path.GetFullPath(Path.Combine(path, PageHelper.Description(ImageFolder.LARGE_MAIN), fileName));
            var MEDIUM = Path.GetFullPath(Path.Combine(path, PageHelper.Description(ImageFolder.MEDIUM), fileName));
            var SMALL = Path.GetFullPath(Path.Combine(path, PageHelper.Description(ImageFolder.SMALL), fileName));
            var EXTRASMALL = Path.GetFullPath(Path.Combine(path, PageHelper.Description(ImageFolder.EXTRASMALL), fileName));
            var pathToDataOrg = Path.GetFullPath(Path.Combine(path, "orj", fileName));

            using (var stream = new FileStream(pathToDataOrg, FileMode.Create)) {
                file.CopyTo(stream);
                stream.Dispose();
                await SaveToCloud(container, manager,
                        new CloudModel() {
                                OrginalFile = pathToDataOrg, FilePath = EXTRALARGE, Width = 1520, Height = 500, SubFolderName = PageHelper.Description(ImageFolder.EXTRALARGE),
                                FileName = fileName
                        });
                await SaveToCloud(container, manager,
                        new CloudModel() {
                                OrginalFile = pathToDataOrg, FilePath = LARGE, Width = 235, Height = 400, SubFolderName = PageHelper.Description(ImageFolder.LARGE),
                                FileName = fileName
                        });
                await SaveToCloud(container, manager,
                        new CloudModel() {
                                OrginalFile = pathToDataOrg, FilePath = MEDIUM, Width = 160, Height = 270, SubFolderName = PageHelper.Description(ImageFolder.LARGE_MAIN),
                                FileName = fileName
                        });
                await SaveToCloud(container, manager,
                        new CloudModel() {
                                OrginalFile = pathToDataOrg, FilePath = LARGE_MAIN, Width = 305, Height = 500, SubFolderName = PageHelper.Description(ImageFolder.MEDIUM),
                                FileName = fileName
                        });
                await SaveToCloud(container, manager,
                        new CloudModel() {
                                OrginalFile = pathToDataOrg, FilePath = SMALL, Width = 184, Height = 200, SubFolderName = PageHelper.Description(ImageFolder.SMALL),
                                FileName = fileName
                        });
                await SaveToCloud(container, manager,
                        new CloudModel() {
                                OrginalFile = pathToDataOrg, FilePath = EXTRASMALL, Width = 184, Height = 140, SubFolderName = PageHelper.Description(ImageFolder.EXTRASMALL),
                                FileName = fileName
                        });
            }

            return fileName;
        }

        public async Task<int> SaveAll(List<IFormFile> files, int adversimentId, AddversimentType type) {
            ImageMasterModel masterModel = new ImageMasterModel();
            masterModel.AdversimentId = adversimentId;
            masterModel.Type = (int) type;

            var master =
                    JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Post("Image", "Add", JsonConvert.SerializeObject(masterModel)));

            foreach (var file in files) {
                Guid id = Guid.NewGuid();
                var fileName = id + file.FileName.Replace(" ","");

                var path = Path.Combine(
                        "wwwroot", "Uploads"
                );

                BlobManager manager = new BlobManager();
                CloudBlobContainer container = await manager.CreateFolderAsync();

                var MAINADD = Path.GetFullPath(Path.Combine(path, PageHelper.Description(ImageFolder.MAINADD), fileName));
                var DETAILADD = Path.GetFullPath(Path.Combine(path, PageHelper.Description(ImageFolder.DETAILADD), fileName));
                var FILTERADD = Path.GetFullPath(Path.Combine(path, PageHelper.Description(ImageFolder.FILTERADD), fileName));

                var pathToDataOrg = Path.GetFullPath(Path.Combine(path, "orj", fileName));

                using (var stream = new FileStream(pathToDataOrg, FileMode.Create)) {
                    file.CopyTo(stream);
                    stream.Dispose();
                    await SaveToCloud(container, manager,
                            new CloudModel() {
                                    OrginalFile = pathToDataOrg, FilePath = MAINADD, Width = 198, Height = 150, SubFolderName = PageHelper.Description(ImageFolder.MAINADD),
                                    FileName = fileName
                            });
                    await SaveToCloud(container, manager,
                            new CloudModel() {
                                    OrginalFile = pathToDataOrg, FilePath = DETAILADD, Width = 420, Height = 400, SubFolderName = PageHelper.Description(ImageFolder.DETAILADD),
                                    FileName = fileName
                            });
                    await SaveToCloud(container, manager,
                            new CloudModel() {
                                    OrginalFile = pathToDataOrg, FilePath = FILTERADD, Width = 200, Height = 175, SubFolderName = PageHelper.Description(ImageFolder.FILTERADD),
                                    FileName = fileName
                            });
                }

                ImagesDetailModel detailModel = new ImagesDetailModel() {
                        ImageMasterId = master,
                        ImageUrl = fileName
                };

                UiRequestManager.Instance.Post("Image", "AddImageDetail", JsonConvert.SerializeObject(detailModel));
            }

            return master;
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