﻿using AvsarGame.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AvsarGame.Entities.Entities
{
    public class UserDrawableMoney: EntityBase<int>
    {
        public Guid UserBalanceDetailId { get; set; }
        public double Amount { get; set; }
        public decimal BillingAmount { get; set; }
    }
}
