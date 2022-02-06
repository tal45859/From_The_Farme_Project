using FromTheFarmer.Data;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Services
{
    public class FavoriteService
    {
        //תקציר
        //
        //בנאי
        //JWT קבלתה מזהה לקוח מה
        //JWT הוספת מועדף על פי 
        //קבלת אוביקט מעודף נקי מאוביקטים נוספים לשימוש פנימי
        //JWT קבלת רשימת מעודפים על פי 
        //קבלת רשימה נקיה מאוביקטים על פי מזהה
        //JWTמחיקת מעודף על פי מזהה לקוח ו
        
        private readonly FromTheFarmerDBContext m_db;
        private readonly JwtService _jwtService;

        //בנאי
        public FavoriteService(FromTheFarmerDBContext db, JwtService jwt)
        {
            m_db = db;
            _jwtService = jwt;
        }

        //JWT קבלתה מזהה לקוח מה
        private int GetCutomerIdByJwt()
        {
            int userid = int.Parse(_jwtService.GetTokenClaims());
            Customer customer = m_db.Customer.Where(u => u.UserId == userid).FirstOrDefault();
            return customer.Id;
        }

        //JWT הוספת מועדף על פי 
        public bool AddFavorite(int postid)
        {

            Favorite FavoriteToAdd = new Favorite();
            FavoriteToAdd.CustomerId = GetCutomerIdByJwt();
            FavoriteToAdd.PostId = postid;
            m_db.Add(FavoriteToAdd);
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //קבלת אוביקט מעודף נקי מאוביקטים נוספים לשימוש פנימי  
        private Favorite GetFavoriteFromDb(int id)
        {
            return m_db.Favorite.Where(f => f.Id == id).FirstOrDefault();
        }

        //JWT קבלת רשימת מעודפים על פי 
        public List<Favorite> GetAllFavoriteByJwt()
        {
            var e = m_db.Favorite.Where(f => f.CustomerId == GetCutomerIdByJwt()).Select(ee => new Favorite()
            {
                Id = ee.Id,
                CustomerId = ee.CustomerId,
                PostId = ee.PostId,
                Post = ee.Post
            }).ToList();
            for (int i = 0; i < e.Count; i++)
            {
                e[i].Post.Product =  m_db.Product.Where(p => p.Id == e[i].Post.ProductId).Select(ee => new Product()
                {
                    Id = ee.Id,
                    ProductName = ee.ProductName,
                    MerchantId = ee.MerchantId,
                    UnitPrice = ee.UnitPrice,
                    UnitInStock = ee.UnitInStock,
                    MoreInfo = ee.MoreInfo
                }).FirstOrDefault();

                e[i].Post.Merchant = m_db.Merchant.Where(m => m.Id == e[i].Post.MerchantId).Select(ee => new Merchant()
                {
                    Id = ee.Id,
                    UserId = ee.UserId,
                    City = ee.City,
                    User = ee.User
                }).FirstOrDefault();
            }
            return e;
        }


        //JWTמחיקת מעודף על פי מזהה מעודף ו
        public ResponseDTO DeleteFavorite(int FavoriteId)
        {
            Favorite favorite = GetFavoriteFromDb(FavoriteId);
            ResponseDTO response = new ResponseDTO();
            if (favorite.CustomerId != GetCutomerIdByJwt())
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"אין הרשאת מחיקה"
                };
            }
            if (favorite == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Favorite with id:{FavoriteId} not found in DB"
                };
            }

            m_db.Favorite.Remove(favorite);
            int c = m_db.SaveChanges();
            if (c > 0)
            {
                response.StatusText = $"הפוסט המעודף נמחק בהצלחה";
                response.Status = StatusCode.Success;
                return response;
            }

            response.StatusText = $"לא הצלחנו למחוק את הפוסט המעודף";
            response.Status = StatusCode.Error;
            return response;
        }

        //קבלת רשימה נקיה מאוביקטים על פי מזהה
        public List<Favorite>GetAllFavoriteFromDB(int id)
        {
            return m_db.Favorite.Where(f => f.CustomerId == id).ToList();
        }

        //JWTמחיקת מעודף על פי מזהה לקוח ו
        public ResponseDTO DeleteAllFavoriteById(int id)
        {
            Customer customer = m_db.Customer.Where(c => c.Id == id).FirstOrDefault();
            if(customer==null)
            {
                return new ResponseDTO { Status = Data.DTO.StatusCode.Error, StatusText = $"משתמש לא מורשה" };
            }
            List<Favorite> favorites = GetAllFavoriteFromDB(customer.Id);
            if(favorites==null)
            {
                return new ResponseDTO { Status = Data.DTO.StatusCode.Error, StatusText = $"לא קימת רשימת מועדפים למשתמש זה" };
            }
            for(int i=0;i<favorites.Count;i++)
            {
                int c = 0;
                m_db.Favorite.Remove(favorites[i]);
                c = m_db.SaveChanges();
                if(c==0)
                {
                    return new ResponseDTO { Status = Data.DTO.StatusCode.Error, StatusText = $"לא הצלחנו למחוק את כל הרשימה" };
                }                            
            }
            return new ResponseDTO { Status = Data.DTO.StatusCode.Success, StatusText = $"רשימת המועדפים נמחקה בהצלחה" };
        }



    }
}
