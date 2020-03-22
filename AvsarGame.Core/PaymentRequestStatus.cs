using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace AvsarGame.Core {
    public enum PaymentStatus {
        [Description("Beklemede")]
        SUSPEND = 0,

        [Description("Onaylandı")]
        APPROVED = 1,

        [Description("Red Edildi")]
        REJECT = 3
    }
}