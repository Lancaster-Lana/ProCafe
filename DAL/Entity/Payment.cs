using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DAL.Entity
{
    public class Payment
    {       
        [Key]
        [JsonProperty("paymentId")]
        public long PaymentId { get; set; }

        [Required]
        [JsonProperty("cardNumber")]
        public string CardNumber { get; set; }

        [Required]
        [JsonProperty("cardExpiry")]
        //[DataType(typeof(DateTime))]
        public string CardExpiry { get; set; }

        [Required]
        [JsonProperty("cardSecurityCode")]
        [RegularExpression("[0-9]{3}")]
        public int CardSecurityCode { get; set; }

        //[JsonIgnore]
        [JsonProperty("authCode")]
        public string AuthCode { get; set; }

        //[JsonIgnore]
        [JsonProperty("total")]
        public decimal Total { get; set; } = 0;
    }
}
