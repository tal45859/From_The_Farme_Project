using FromTheFarmer.Data.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.DTO
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public string Img { get; set; }
        public int PostId { get; set; }
        public int MerchantId { get; set; }
    }
}
