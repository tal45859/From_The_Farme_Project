using FromTheFarmer.Data;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using Microsoft.EntityFrameworkCore.Query.Internal;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Services
{
    public class AdminService
    {
        //תקציר
        //////////
        //בנאי
        //JWTקבלת אוביקט מנהל מה 
        //קבלת מנהל לפי מזהה מוגבל למנהל
        //הוספת מנהל מוגבל למנהל
        //קבלת כל המנהלים מוגבל למנהל
        //JWTעדכון מנהל לפי
        //מחיקת מנהל לפי מזהה מנהל

        private readonly FromTheFarmerDBContext m_db;
        private readonly JwtService _JwtService;
        private readonly UserService _UserService;
        private readonly CustomerService _CustomerService;
        private readonly FavoriteService _FavoriteService;

        //בנאי
        public AdminService(FromTheFarmerDBContext db, JwtService jwt , UserService userservice, CustomerService customerservice, FavoriteService favoriteService)
        {
            m_db = db;
            _JwtService = jwt;
            _UserService = userservice;
            _CustomerService = customerservice;
            _FavoriteService = favoriteService;
        }

        //JWTקבלת אוביקט מנהל מה 
        public User GetAdminByJWT()
        {
            string id = _JwtService.GetTokenClaims();
            return GetAdminById(int.Parse(id));
        }

        //קבלת מנהל לפי מזהה מוגבל למנהל
        public User GetAdminById(int id)
        {
            return m_db.User.Where(u => u.Id == id && u.Role=="Admin").FirstOrDefault();
        }

        //הוספת מנהל מוגבל למנהל
        public bool AddAdmin(UserDTO admins)
        {
            int c = 0;
            //delete from table merchant or Customer
            if (admins.Role == "Merchant")
            {
                Merchant MerchantToDelete = m_db.Merchant.Where(m => m.UserId == admins.Id).FirstOrDefault();
                m_db.Merchant.Remove(MerchantToDelete);
                c = m_db.SaveChanges();
                if (c==0)
                {
                    return false;
                }
            }
            else if (admins.Role == "Customer")
            {
                Customer CustomerToDelete = m_db.Customer.Where(c => c.UserId == admins.Id).FirstOrDefault();
                ResponseDTO res = _FavoriteService.DeleteAllFavoriteById(CustomerToDelete.Id);
                if (res.Status == Data.DTO.StatusCode.Error && (res.StatusText == "משתמש לא מורשה" || res.StatusText == "לא הצלחנו למחוק את כל הרשימה"))
                {
                    return false;
                }
                m_db.Customer.Remove(CustomerToDelete);
                c = m_db.SaveChanges();
                if (c == 0)
                {
                    return false;
                }
            }
            //update to role user
            admins.Role = "Admin";
            _UserService.UpdateUserRoleForAdmin(admins.Id, admins);
            return true;
        }

        //קבלת כל המנהלים מוגבל למנהל
        public List<User> GetAllAdmins()
        {
            return m_db.User.Where(u => u.Role == "Admin").ToList();
        }

        //JWTעדכון מנהל לפי
        public ResponseDTO UpdateAdminByJWT(UserDTO AdminToUpdate)
        {
            return _UserService.UpdateUser(AdminToUpdate);
        }



        //מחיקת מנהל לפי מזהה מנהל
        public ResponseDTO DeleteAdminById(int id)
        {
            User AdminToDelete = GetAdminById(id);
            ResponseDTO response = new ResponseDTO();
            if (AdminToDelete == null ||AdminToDelete.Id!=id || AdminToDelete.Role!="Admin")
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Admin with id:{AdminToDelete.Id} not found in DB"
                };
            }
            //customer
            CustomerDTO customer = new CustomerDTO();
            customer.UserId = AdminToDelete.Id;
            customer.City = "----";
            bool isok = _CustomerService.AddCustomer(customer);
            if (isok == false)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"לא הצלחנו למחוק את המנהל ולהוסיפו לטבלת לקוחות"
                };
            }
            //user 
            UserDTO user = new UserDTO();
            user.Id = AdminToDelete.Id;
            user.Role = "Customer";
            response=_UserService.UpdateUserRoleForAdmin(AdminToDelete.Id, user);
            if (response.Status == Data.DTO.StatusCode.Error)
            {
                return response;
            }
            response.StatusText = $"המנהל נמחק בהצלחה";
            return response;
        }



    }
}
