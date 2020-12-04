using AvsarGame.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AvsarGame.Entities.Entities
{
    public class UserMoneyDrawRequest : EntityBase<int>
    {
        public Guid UserId { get; set; }
        public double Amount { get; set; }
        public int Statu { get; set; }
        public string Iban { get; set; }
        public string TicketNo { get; set; }
    }
}
