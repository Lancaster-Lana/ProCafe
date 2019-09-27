using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace LanaResto.Models
{
    public class RegisterViewModel
    {
        [Required]
        [Display(Name = "First Name")]
        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "User Name")]
        [JsonProperty("userName")]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        [JsonProperty("email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        [JsonProperty("password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [JsonProperty("confirmPassword")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
