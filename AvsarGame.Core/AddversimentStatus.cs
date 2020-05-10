using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace AvsarGame.Core {
    public enum AddversimentStatus {
        [Description("Beklemede")]
        SUSPEND = 0,

        [Description("Yayında")]
        APPROVED = 1,

        [Description("Red Edildi")]
        REJECT = 2
    }
}