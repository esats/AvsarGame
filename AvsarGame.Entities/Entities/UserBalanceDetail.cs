using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Core.Entities;

namespace AvsarGame.Entities.Entities {
    public class UserBalanceDetail:EntityBase<Guid> {
        public UserBalance UserBalance { get; set; }
        public int TransactionDescription { get; set; }
        public decimal Amount { get; set; }
    }

    public enum TRANSACTION_DESCIPTION {
        EFT_HAVALE = 0,
        CREDIR_CARD = 1,
        ORDER = 3 
    }
}