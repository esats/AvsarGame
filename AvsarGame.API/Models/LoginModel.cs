using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.API.Models {
    public class LoginModel {
        [Required(ErrorMessage = "Lütfen Şifrenizi Giriniz")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Lütfen Email Giriniz")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}