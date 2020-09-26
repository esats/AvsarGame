using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace AvsarGame.API.Models {
    public class RegisterModel :ModelBase<string> {
        public string FullName => Name +" "+Surname;
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string ImageUrl { get; set; }
        public int? Gender { get; set; }
        public DateTime? Birthdate { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string BearerToken { get; set; }
        public string Errors { get; set; }
        [JsonIgnore]
        public IFormFile Image { get; set; }
    }
}