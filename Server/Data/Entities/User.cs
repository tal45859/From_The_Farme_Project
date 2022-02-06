using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace FromTheFarmer.Data.Entities
{
    [Table("User")]
    public class User
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [StringLength(320)]
        [Column("Mail")]
        public string Mail { get; set; }

        [StringLength(50)]
        [Column("FirstName")]
        public string FirstName { get; set; }
        
        [StringLength(50)]
        [Column("LastName")]
        public string LastName { get; set; }

        [Column(TypeName="date")]
        public DateTime RegisterDate { get; set; }

        [Column(TypeName = "date")]      
        public DateTime Birthdate { get; set; } 

        [StringLength(50)]
        [Column("Phone")]
        public string Phone { get; set; }

        [StringLength(50)]
        [Column("Role")]
        public string Role { get; set; }

        [Column(TypeName = "date")]
        public DateTime LastLogin { get; set; }

        [StringLength(50)]
        [Column("Password")]
        public string Password { get; set; }

        [Column("IsActive")]
        public bool IsActive { get; set; }

        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<Merchant> Merchant { get; set; }
    }
}
