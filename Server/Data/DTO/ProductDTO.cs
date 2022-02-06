using FromTheFarmer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int MerchantId { get; set; }
        public double? UnitPrice { get; set; }
        public int UnitInStock { get; set; }
        public string MoreInfo { get; set; }
    }
}
