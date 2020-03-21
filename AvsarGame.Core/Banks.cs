using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace AvsarGame.Core {
    public enum Banks {
        [Description("Akbank")]
        AKBANK = 0,
        [Description("Ziraat Bankası")]
        ZIRAAT = 1,
        [Description("Garanti Bankası")]
        GARANTI = 3
    }

}