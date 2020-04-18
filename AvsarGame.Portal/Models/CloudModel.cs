using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SixLabors.ImageSharp;

namespace AvsarGame.Portal.Models
{
    public class CloudModel
    {
        public string OrginalFile { get; set; }
        public string FilePath { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string SubFolderName { get; set; }
        public string FileName { get; set; }
    }
}
