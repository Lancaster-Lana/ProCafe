using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace DAL.Entity
{
    public class Order
    {
        [Key]
        [JsonProperty("id")]
        public long OrderId { get; set; }

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }

        //[BindNever]
        public bool Shipped { get; set; } = false;

        public bool Submitted { get; set; } = false;

        [Required]
        public long AddressId { get; set; }

        //[JsonProperty("address")]//[JsonIgnore]
        [ForeignKey("AddressId")]
        public virtual Address Address{ get; set; }

        [Required]
        public long PaymentId { get; set; }

        //[JsonProperty("payment")]//[JsonIgnore]
        [ForeignKey("PaymentId")]
        public virtual Payment Payment { get; set; }

        //[ForeignKey("OrderId")]
        public virtual ICollection<CartLine> SelectedProducts { get; set; }
    }
}
