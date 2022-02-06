using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.Entities
{
    [Table("Favorite")]
    public class Favorite
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("CustomerId"),Required]
        public int CustomerId { get; set; }

        [Column("PostId"), Required]
        public int PostId { get; set; }

        [Required]
        public virtual Post Post { get; set; }
    }
}
