using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.Entities
{
    [Table("Image")]
    public class Image
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [StringLength(50)]
        [Column("Img")]
        public string Img { get; set; }

        [Column("PostId")]
        public int PostId { get; set; }

        [Column("MerchantId")]
        public int MerchantId { get; set; }
    }
}
