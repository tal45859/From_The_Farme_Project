using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.DTO
{
    public class FavoriteDTO
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int PostId { get; set; }
    }
}
