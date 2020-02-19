using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using AvsarGame.Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace AvsarGame.Entities.Entities {
    public class ApplicationUser : IdentityUser, IEntity {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? Birthdate { get; set; }
        public int? Age { get; set; }
        [NotMapped]
        public string BearerToken { get; set; }
        public int? Gender { get; set; }
    }

    public class ApplicationRole : IdentityRole<string>, IEntity {
    }
}