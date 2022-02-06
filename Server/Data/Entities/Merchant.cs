using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.Entities
{
    [Table("Merchant")]
    public class Merchant
    {
        [Key]        
        [Column("Id")]
        public int Id { get; set; }
     
        [Required]
        [Column("UserId")]
        public int UserId { get; set; }

        [Column("City"),MaxLength(50)]
        public string City { get; set; }

        [Required]
        public virtual User User { get; set; }

        public virtual ICollection<Post> Post { get; set; }
    }
}
