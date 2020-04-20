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

        [Description("160x270")]
        LARGE_MAIN = 5,

        [Description("305x500")]
        MEDIUM = 2,

        [Description("184x200")]
        SMALL = 3,

        [Description("184x140")]
        EXTRASMALL = 4
    }
}