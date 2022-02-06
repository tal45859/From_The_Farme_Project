using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Data.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Mail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTime Birthdate { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public DateTime LastLogin { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
    }
}
