﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class LoggedModel {
        public string FullName => Name + " " + Surname;
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? Birthdate { get; set; }
        public int? Age { get; set; }
        public string BearerToken { get; set; }
        public string ReturnUrl { get; set; }
        public string PhoneNumber { get; set; }
    }
}