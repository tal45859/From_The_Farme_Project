using FromTheFarmer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.DTO
{
    public class MerchantDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string City { get; set; }
        public  User User { get; set; }
    }
}
