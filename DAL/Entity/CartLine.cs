using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace DAL.Entity
{
    public class CartLine
    {
        [Key]
        [JsonProperty("cartLineId")]
        public long CartLineId { get; set; } = 0;//if not created (order is new)

        [JsonProperty("orderId")]
        //[ForeignKey("OrderId")]
        public long OrderId { get; set; }

        [ForeignKey("OrderId")]
        [JsonIgnore]
        public virtual Order Order { get; set; }

        [Required]
        [JsonProperty("productId")]
        public long ProductId { get; set; }

        [Required]
        [JsonProperty("quantity")]
        public int Quantity { get; set; } = 0;
    }
}
