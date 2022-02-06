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
    public class MerchantService
    {
        //תקציר
        ///////////
        //בנאי
        // JWT קבלת מזהה משתמש על פי  
        //JWT קבלת מזהה סוחר  
        // IDקבלת סוחר על פי 
        //הוספת סוחר חדש
        //החזרת כל הסוחרים
        //JWT מחזיר סוחר על פי מזהה סוחר מה
        //קבלת סוחר על פי מזהה או הצפנה לשימוש פנימי
        //JWT מחיקת סוחר על פי 
        //מחיקת סוחר על פי מזהה מוגבל למנהל
        //JWTעדכון סוחר על פי מזהה מה

        private readonly FromTheFarmerDBContext m_db;
        private readonly JwtService _jwtService;
        private readonly CustomerService _CustomerService;
        private readonly UserService _UserService;

        //בנאי
        public MerchantService(FromTheFarmerDBContext db, JwtService jwt , CustomerService customerservice, UserService userservice)
        {
            m_db = db;
            _jwtService = jwt;
            _CustomerService = customerservice;
            _UserService = userservice;
        }

        // JWT קבלת מזהה משתמש על פי   
        public int GetUserByJWT()
        {
            string userid = _jwtService.GetTokenClaims();
            return int.Parse(userid);
        }

        //JWTקבלת מזהה סוחר מה      
        public int GetMerchantId()
        {
            int userid = GetUserByJWT();
            Merchant merchant = m_db.Merchant.Where(m => m.UserId == userid).FirstOrDefault();
            return merchant.Id;
        }

        // IDקבלת סוחר על פי 
        public Merchant GetMerchantById(int id)
        {
            var e = m_db.Merchant.Where(Merchant => Merchant.Id == id).Select(ee => new Merchant()
            {
                Id = ee.Id,
                UserId = ee.UserId,
                City = ee.City,
                User = ee.User
            }).FirstOrDefault();
            return e;
        }

        //הוספת סוחר חדש
        public bool AddMerchant(MerchantDTO merchant)
        {
            Merchant merchant1 = new Merchant();
            merchant1.UserId = merchant.UserId;     
            merchant1.City = merchant.City;       
            m_db.Merchant.Add(merchant1);
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //החזרת כל הסוחרים
        public List<MerchantDTO> GetMerchants()
        {
            var e = m_db.Merchant.Include(i=>i.User).Select(ee => new MerchantDTO()
            {
                Id = ee.Id,
                UserId = ee.UserId,
                City = ee.City,
                User = ee.User
            }).ToList();
            return e;
        }

        //JWT מחזיר סוחר על פי מזהה סוחר מה
        public Merchant GetMerchantByJwt()
        {
            int userId = GetUserByJWT();
            var e = m_db.Merchant.Where(Merchant => Merchant.UserId == userId).Select(ee => new Merchant()
            {
                Id = ee.Id,
                UserId = ee.UserId,
                City = ee.City,
                User = ee.User
            }).FirstOrDefault();
            return e;
        }

        //קבלת סוחר על פי מזהה או הצפנה לשימוש פנימי
        private Merchant GetMerchantFromDb(int id=0)
        {
            if(id == 0)
            {
                id = GetMerchantId();
            }
            return m_db.Merchant.Where(merchant => merchant.Id == id).FirstOrDefault();
        }

        //JWT מחיקת סוחר על פי 
        public ResponseDTO DeleteMerchantByJWt()
        {
            Merchant MerchantToDelete = GetMerchantFromDb();
            ResponseDTO response = new ResponseDTO();
            if (MerchantToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Merchant with id:{MerchantToDelete.Id} not found in DB"
                };
            }
            //customer
            CustomerDTO customer = new CustomerDTO();
            customer.UserId = MerchantToDelete.UserId;
            customer.City = MerchantToDelete.City;
            bool isok = _CustomerService.AddCustomer(customer);
            if(isok==false)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"לא הצלחנו למחוק את הסוחר ולהוסיפו לטבלת לקוחות"
                };
            }
            //user
            UserDTO user = new UserDTO();
            user.Id = MerchantToDelete.UserId;
            user.Role = "Customer";
            _UserService.UpdateUserRoleForAdmin(MerchantToDelete.UserId, user);
            //merchant
            m_db.Merchant.Remove(MerchantToDelete);
            m_db.SaveChanges();
            response.StatusText = $"המשתמש נמחק בהצלחה והוסף לטבלת הלקוחות";
            response.Status = StatusCode.Success;
            return response;
        }

        //מחיקת סוחר על פי מזהה מוגבל למנהל
        public ResponseDTO DeleteMerchantByIdForAdmin(int id)
        {
            Merchant MerchantToDelete = GetMerchantFromDb(id);
            ResponseDTO response = new ResponseDTO();
            if (MerchantToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Merchant with id:{id} not found in DB"
                };
            }
            //customer
            CustomerDTO customer = new CustomerDTO();
            customer.UserId = MerchantToDelete.UserId;
            customer.City = MerchantToDelete.City;
            bool isok = _CustomerService.AddCustomer(customer);
            if (isok == false)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"לא הצלחנו למחוק את הסוחר ולהוסיפו לטבלת לקוחות"
                };
            }
            //user 
            UserDTO user = new UserDTO();
            user.Id = MerchantToDelete.UserId;
            user.Role = "Customer";
            _UserService.UpdateUserRoleForAdmin(MerchantToDelete.UserId, user);
            //merchant
            m_db.Merchant.Remove(MerchantToDelete);
            m_db.SaveChanges();
            response.StatusText = $"המשתמש נמחק בהצלחה והוסף לטבלת הלקוחות";
            response.Status = StatusCode.Success;
            return response;
        }

        //JWTעדכון סוחר על פי מזהה מה
        public ResponseDTO UpdateMerchantByJwt(MerchantDTO MerchantToUpdate)
        {
            Merchant MerchantsFromDB = GetMerchantFromDb();
            ResponseDTO response = new ResponseDTO();
            if (MerchantsFromDB.Id != MerchantToUpdate.Id)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Bad Request";
            }

            try
            {                
                MerchantsFromDB.City = MerchantToUpdate.City;
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
    }
}
