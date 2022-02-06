using FromTheFarmer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.DTO
{
    public class PostDTO
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public virtual Category Category { get; set; }
        public virtual Merchant Merchant { get; set; }
        public virtual Product Product { get; set; }
        public bool IsShip { get; set; }
    }
}
