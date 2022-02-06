using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.Entities
{
    [Table("Post")]
    public class Post
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [Column("MerchantId")]
        public int MerchantId { get; set; }

        [Required]
        [Column("CategoryId")]
        public int CategoryId { get; set; }

        [Required]
        [Column("ProductId")]
        public int ProductId { get; set; }

        [Column(TypeName = "date")]
        public DateTime CreatedAt { get; set; }

        [Column("IsShip")]
        public bool IsShip { get; set; }

        [Required]
        public virtual Category Category { get; set; }

        [Required]
        public virtual Merchant Merchant { get; set; }

        [Required]
        public virtual Product Product { get; set; }

        [Required]
        public virtual ICollection<Favorite> Favorite { get; set; }
    }
}
