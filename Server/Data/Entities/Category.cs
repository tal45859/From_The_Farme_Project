using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.Entities
{
    [Table("Category")]
    public class Category
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [StringLength(50)]
        [Column("CategoryName")]
        public string CategoryName { get; set; }

        public virtual ICollection<Post> Post { get; set; }
    }
}
