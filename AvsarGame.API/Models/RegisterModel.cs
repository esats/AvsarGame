using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using Microsoft.AspNetCore.Http;

namespace AvsarGame.API.Models {
    public class RegisterModel :ModelBase<Guid> {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public int? Gender { get; set; }
        public DateTime? Birthdate { get; set; }
        public IFormFile formData { get; set; }
    }
}