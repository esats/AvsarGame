using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace AvsarGame.Core {
    public enum ImageFolder {
        [Description("1520x500")]
        EXTRALARGE = 0,

        [Description("235x400")]
        LARGE = 1,

        [Description("305x500")]
        LARGE_MAIN = 2,

        [Description("184x200")]
        SMALL = 3,

        [Description("184x140")]
        EXTRASMALL = 4,
        
        [Description("160x270")]
        MEDIUM = 5,

        [Description("198x150")]
        MAINADD = 6,

        [Description("550x400")]
        DETAILADD = 7,

        [Description("200x175")]
        FILTERADD = 8
    }
}