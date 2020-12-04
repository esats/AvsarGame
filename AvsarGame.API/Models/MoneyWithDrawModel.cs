using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models
{
    public class MoneyWithDrawModel
    {
        public Guid UserId { get; set; }
        public string FullName { get; set; }
        public string Iban { get; set; }
        public double Amount { get; set; }
        public int RequestId { get; set; }
    }
}
