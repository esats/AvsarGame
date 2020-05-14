using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace AvsarGame.Core {
    public enum FilterOrderBy {
        [Description("ORDER BY Price ASC")]
        priceAsc = 0,

        [Description("ORDER BY Price DESC")]
        priceDesc = 1,

        [Description("ORDER BY CreatedDate ASC")]
        createdAsc = 2,

        [Description("ORDER BY CreatedDate DESC")]
        createdDesc = 3
    }
}