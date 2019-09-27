using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace DAL.Entity
{
    public class Product
    {
        [Key]
        public long ProductId { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }
        public decimal Price { get; set; }

        /// <summary>
        /// Path+image of the product
        /// </summary>
        public string ImageName { get; set; }

        public byte[] ImageContent { get; set; }

        [NotMapped]
        public string ImageFileString { get; set; }

        //public List<Supplier> Supplier { get; set; }
        //public List<Rating> Ratings { get; set; }
    }
}
