using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DAL.Entity
{
    /// <summary>
    /// Shipping order address
    /// </summary>
    public class Address //: BaseEntity<int>
    {
        [Key]
        [JsonProperty("addressId")]
        public long AddressId { get; set; }

        /// <summary>
        /// FK
        /// </summary>
        //public long OrderId { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("street")]
        public string Street { get; set; }
    }
}