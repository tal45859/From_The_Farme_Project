using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.Entities
{
    [Table("Product")]
    public class Product
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [StringLength(50)]
        [Column("ProductName")]
        public string ProductName { get; set; }

        [Required]
        [Column("MerchantId")]
        public int MerchantId { get; set; }

        [Column("UnitPrice")]
        public double? UnitPrice { get; set; }

        [Column("UnitInStock")]
        public int UnitInStock { get; set; }

        [StringLength(255)]
        [Column("MoreInfo")]
        public string MoreInfo { get; set; }

        public virtual ICollection<Post> Post { get; set; }
    }
}
