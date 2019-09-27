using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LanaResto.Models
{
    public class LoginViewModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
