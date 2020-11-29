using AutoMapper.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Models;

namespace AvsarGame.Portal.Helpers
{
    public class BlobManager
    {
        public async Task<CloudBlobContainer> CreateFolderAsync()
        {
            //CloudStorageAccount storageAccount = CloudStorageAccount.Parse(("StorageConnection"));
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(@"DefaultEndpointsProtocol=https;AccountName=anatoliagm;AccountKey=AQDXIUjj+Pg+CiSymxhGFJAxz4YzIKE6R8BC2yMmrN2PWC9tAHgmLvAvmilZ2OKn8vUQW5F/Pw4SiCLsX/817A==;EndpointSuffix=core.windows.net");
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                
            CloudBlobContainer container = blobClient.GetContainerReference("uploads");
            try {
                await container.SetPermissionsAsync(
                        new BlobContainerPermissions
                        {
                                PublicAccess = BlobContainerPublicAccessType.Blob,
                        }); 
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
         

            await container.CreateIfNotExistsAsync();

            return container;
        }

        public async Task<CloudBlockBlob> UploadFileAsync(CloudBlobContainer container, CloudModel model)
        {
            //CloudBlockBlob blob = container.GetBlockBlobReference(string.Format(ConfigurationManager.Instance.GetValue("FileUploadBlobPath"), tmodel.ModuleType, tmodel.ModuleId, tmodel.UniqueName.ToLower()));

            CloudBlockBlob blob = container.GetBlockBlobReference(model.SubFolderName + "/"+ model.FileName);
            await blob.UploadFromFileAsync(model.FilePath);

            var aa = blob.Parent.Prefix;
            //var a1a = SignUrl(appFile);k
            return blob;
            //using (var fileStream = System.IO.File.OpenRead(model.FilePath))
            //{
            //    await blob.UploadFromStreamAsync(fileStream);

            //    return blob;
            //}
        }
   
        public string SignUrl(string blobName, string blobPath, DateTime? startTime, DateTime? expiryTime)
        {
            //CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.Instance.GetConnectionString("StorageConnection"));
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(@"DefaultEndpointsProtocol=https;AccountName=anatoliagm;AccountKey=AQDXIUjj+Pg+CiSymxhGFJAxz4YzIKE6R8BC2yMmrN2PWC9tAHgmLvAvmilZ2OKn8vUQW5F/Pw4SiCLsX/817A==;EndpointSuffix=core.windows.net");
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference(blobPath);
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(blobName.ToLower());

            SharedAccessBlobPolicy sasConstraints = new SharedAccessBlobPolicy();
            sasConstraints.SharedAccessStartTime = startTime.Value.AddMinutes(-5);
            sasConstraints.SharedAccessExpiryTime = expiryTime.Value;
            sasConstraints.Permissions = SharedAccessBlobPermissions.Read;

            //Generate shared access URL 
            string sasContainerToken = blockBlob.GetSharedAccessSignature(sasConstraints);

            return blockBlob.Uri + sasContainerToken;
        }
    }
}
