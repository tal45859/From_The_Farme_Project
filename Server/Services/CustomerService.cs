using FromTheFarmer.Data;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Services
{
    public class CustomerService
    {
        //תקציר
        ///////////
        //בנאי
        //JWTקבלת מזהה משתמש מה
        //JWTקבלת מזהה לקוח מה
        //הוספת לקוח
        //קבלת אוביקט לקוח נקי מאוביקטים לשימוש פנימי
        //JWTקבלת לקוח על פי 
        //קבלת לקוח על פי מזהה מוגבל למנהל
        //קבלת כל הלקוחותת מוגבל למנהל  
        //JWTעדכון לקוח מה
        //JWTמחיקת לקוח מה
        // והוספה לטבלת סוחריםJWT מחיקת לקוח מה
        private readonly FromTheFarmerDBContext m_db;
        private readonly JwtService _jwtservice;
        private readonly UserService _UserService;
        private readonly FavoriteService _FavoriteService;

        //בנאי
        public CustomerService(FromTheFarmerDBContext db, JwtService jwt, UserService userservice, FavoriteService favoriteService)
        {
            m_db = db;
            _jwtservice = jwt;
            _UserService = userservice;
            _FavoriteService = favoriteService;
        }

        //JWTקבלת מזהה משתמש מה
        private int GetUserIdFromJWT()
        {
            string UserId = _jwtservice.GetTokenClaims();
            return int.Parse(UserId);
   
        }

        //JWTקבלת מזהה לקוח מה
        public int GetCustomerId()
        {
            Customer customer = m_db.Customer.Where(c => c.UserId == GetUserIdFromJWT()).FirstOrDefault();
            return customer.Id;
        }

        //הוספת לקוח
        public bool AddCustomer(CustomerDTO customer)
        {
            Customer customer1 = new Customer();
            customer1.UserId = customer.UserId;
            customer1.City = customer.City;
            m_db.Customer.Add(customer1); 
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //קבלת אוביקט לקוח נקי מאוביקטים לשימוש פנימי
        private Customer GetCustomerFromDb()
        {
            int id = GetCustomerId();
            return m_db.Customer.Where(customer => customer.Id == id).FirstOrDefault();
        }

        //JWTקבלת לקוח על פי 
        public Customer GetCustomerByJWT()
        {
            int userid = GetUserIdFromJWT();
            var e = m_db.Customer.Where(Customer => Customer.UserId == userid).Select(ee => new Customer()
            {
                Id = ee.Id,
                City = ee.City,
                UserId = ee.UserId,
                User = ee.User
            }).FirstOrDefault();
            return e;
        }

        //קבלת לקוח על פי מזהה מוגבל למנהל
        public Customer GetCustomerByIdForAdmin(int id)
        {
            var e = m_db.Customer.Where(Customer => Customer.Id == id).Select(ee => new Customer()
            {
                Id = ee.Id,
                City = ee.City,
                UserId = ee.UserId,
                User = ee.User
            }).FirstOrDefault();
            return e;
        }


        //קבלת כל הלקוחותת מוגבל למנהל 
        public List<Customer> GetAllCustomersForAdmin()
        {
            var e = m_db.Customer.Include(i => i.User).Select(ee => new Customer()
            {
                Id = ee.Id,
                City = ee.City,
                UserId = ee.UserId,
                User = ee.User
            }).ToList();
            return e;
        }

        //JWTעדכון לקוח מה
        public ResponseDTO UpdateCustomer(CustomerDTO CustomerToUpdate)
        {
            Customer CustomersFromDB = GetCustomerFromDb();
            ResponseDTO response = new ResponseDTO();
            if (CustomersFromDB.Id != CustomerToUpdate.Id)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Bad Request";
            }

            try
            {
                CustomersFromDB.City = CustomerToUpdate.City;

                int c = m_db.SaveChanges();
                if (c > 0)
                {
                    return new ResponseDTO { Status = StatusCode.Success };
                }
            }
            catch (Exception)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"לא הצלחנו לשמור את השינוי, ערך אחד או כמה אינם תקינים";
            }
            return response;
        }

        //JWTמחיקת לקוח מה
        public ResponseDTO DeleteCustomer()
        {
            Customer CustomerToDelete = GetCustomerFromDb();
            ResponseDTO res = _FavoriteService.DeleteAllFavoriteById(CustomerToDelete.Id);
            if (res.Status == Data.DTO.StatusCode.Error && (res.StatusText == "משתמש לא מורשה" || res.StatusText == "לא הצלחנו למחוק את כל הרשימה"))
            {
                return res;
            }
            ResponseDTO response = new ResponseDTO();
            if (CustomerToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Customers with id:{CustomerToDelete.Id} not found in DB"
                };
            }
            m_db.Customer.Remove(CustomerToDelete);
            m_db.SaveChanges();
            response.StatusText = $"הלקוח נמחק בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }

        // והוספה לטבלת סוחריםJWT מחיקת לקוח מה
        public ResponseDTO DeleteCustomerAndAddMerchant()
        {
            int c = 0;
            //save customer in obj merchant
            Customer CustomerToDelete = GetCustomerFromDb();
            ResponseDTO res= _FavoriteService.DeleteAllFavoriteById(CustomerToDelete.Id);
            if(res.Status == Data.DTO.StatusCode.Error && (res.StatusText == "משתמש לא מורשה" || res.StatusText == "לא הצלחנו למחוק את כל הרשימה"))
            {
                return res;
            }
            Merchant merchant = new Merchant();
            merchant.UserId = CustomerToDelete.UserId;
            merchant.City = CustomerToDelete.City;
            //delete customer 
            m_db.Customer.Remove(CustomerToDelete);
            c= m_db.SaveChanges();
            if(c==0)
            {
                return new ResponseDTO() { Status = Data.DTO.StatusCode.Error, StatusText = $"לא הצלחנו למחוק את הלקוח" };
            }
            //add merchant
            m_db.Merchant.Add(merchant);
            c = m_db.SaveChanges();
            if (c == 0)
            {
                return new ResponseDTO() { Status = Data.DTO.StatusCode.Error, StatusText = $"לא הצלחנו להוסיף לטבלת סוחרים" };
            }
            //update role in user
            UserDTO user = new UserDTO();
            user.Id = CustomerToDelete.UserId;
            user.Role = "Merchant";
            return _UserService.UpdateUserRoleForAdmin(CustomerToDelete.UserId, user);      
        }


    }
}
