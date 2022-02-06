using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.Entities
{
    [Table("Customer")]
    public class Customer
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Required]
        [Column("UserId")]
        public int UserId { get; set; }

        [Column("City")]
        public string City { get; set; }

        [Required]
        public virtual User User { get; set; }        
    }
}
