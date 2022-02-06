using FromTheFarmer.Data;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Services
{
    public class PostService
    {
        //תקציר
        ///////////
        //בנאי
        //קבלת מזהה סוחר מסרויס סוחר
        //קבלת מודעה לשימוש פנימי
        //הוספת מודעה
        //קבלת רשימת מודעות לפי מזהה קטגוריה
        //קבלת המודעה האחרון שהסוחר העלה
        //קבלת רשימת מודעות לסוחר
        //קבלת רשימת מודעות לפי מזהה סוחר מההפצפנה מוגבל לסוחר
        //קבלת רשימת מודעות
        //קבלת מודעה לפי מזהה מודעה
        //עדכון מודעה לוודא שהמודעה שיכת לאותו סוחר
        //מחיקת מודעה לוודא שהמודעה שייכת לאותו סוחר
        //מחיקת מודעה מנהל
        private readonly FromTheFarmerDBContext m_db;
        private readonly MerchantService _merchantservice;

        //בנאי
        public PostService(FromTheFarmerDBContext db, MerchantService merchantservice)
        {
            m_db = db;
            _merchantservice = merchantservice;
        }

        //קבלת מזהה סוחר מסרויס סוחר
        public int GetMerchantId()
        {
            return _merchantservice.GetMerchantId();
        }

        //קבלת מודעה לשימוש פנימי
        private Post GetPostFromDb(int id)
        {
            return m_db.Post.Where(post => post.Id == id).FirstOrDefault();
        }

        //הוספת מודעה
        public bool AddPost(PostDTO post)
        { 
            Post post1 = new Post();
            post1.MerchantId = GetMerchantId();
            post1.ProductId = post.ProductId;
            post1.CategoryId = post.CategoryId;
            post1.IsShip = post.IsShip;
            post1.CreatedAt = DateTime.Now;
            m_db.Post.Add(post1); 
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //קבלת רשימת מודעות לפי מזהה קטגוריה
        public List<Post> GetAllPostByCategoryId(int catgeoryid)
        {
            var e = m_db.Post.Where(post => post.CategoryId == catgeoryid).Select(ee => new Post()
            {
                Id = ee.Id,
                MerchantId = ee.MerchantId,
                CategoryId = ee.CategoryId,
                IsShip = ee.IsShip,
                Merchant = ee.Merchant,
                ProductId = ee.ProductId,
                Product = ee.Product,
                Category = ee.Category,
                CreatedAt = ee.CreatedAt
            }).ToList();
            return e;
        }

        //קבלת המודעה האחרון שהסוחר העלה
        public Post GEtLastPostForMerchantByJwt()
        {
            int merchantid = GetMerchantId();
            var e = m_db.Post.Where(post => post.MerchantId == merchantid).Select(ee => new Post()
            {
                Id = ee.Id,
                MerchantId = ee.MerchantId,
                CategoryId = ee.CategoryId,
                IsShip = ee.IsShip,
                Merchant = ee.Merchant,
                ProductId = ee.ProductId,
                Product = ee.Product,
                Category = ee.Category,
                CreatedAt = ee.CreatedAt
            }).ToList();
            return e.Last();
        }

        //קבלת רשימת מודעות לסוחר
        public List<Post> GetAllPostsByMerchantId(int merchantid)
        {
            var e = m_db.Post.Where(Post => Post.MerchantId == merchantid).Select(ee => new Post()
            {
                Id = ee.Id,
                MerchantId = ee.MerchantId,
                CategoryId = ee.CategoryId,
                IsShip = ee.IsShip,
                Merchant = ee.Merchant,
                ProductId = ee.ProductId,
                Product = ee.Product,
                Category = ee.Category,
                CreatedAt = ee.CreatedAt
            }).ToList();
            return e;
        }

        //קבלת רשימת מודעות של הסוחר
        public List<Post>GetAllPostsByJWTForMerchant()
        {
            int merchantid = GetMerchantId();
            var e = m_db.Post.Where(post => post.MerchantId == merchantid).Select(ee => new Post()
            {
                Id = ee.Id,
                MerchantId = ee.MerchantId,
                CategoryId = ee.CategoryId,
                IsShip = ee.IsShip,
                Merchant = ee.Merchant,
                ProductId = ee.ProductId,
                Product = ee.Product,
                Category = ee.Category,
                CreatedAt = ee.CreatedAt
            }).ToList();
            return e;
        }

        //קבלת רשימת מודעות
        public List<Post> GetAllPosts()
        {
            var e = m_db.Post.Select(ee => new Post()
            {
                Id = ee.Id,
                MerchantId = ee.MerchantId,
                CategoryId = ee.CategoryId,
                IsShip = ee.IsShip,
                Merchant = ee.Merchant,
                ProductId = ee.ProductId,
                Product = ee.Product,
                Category = ee.Category,
                CreatedAt = ee.CreatedAt
            }).ToList();
            return e;
        }

        //קבלת מודעה לפי מזהה מודעה
        public Post GetPost(int id)
        {
            var e = m_db.Post.Where(Post => Post.Id == id).Include(p=>p.Product).Select(ee => new Post()
            {
                Id = ee.Id,
                MerchantId = ee.MerchantId,
                CategoryId = ee.CategoryId,
                IsShip = ee.IsShip,
                Merchant = ee.Merchant,
                ProductId = ee.ProductId,
                Product = ee.Product,
                Category = ee.Category,
                CreatedAt = ee.CreatedAt
            }).FirstOrDefault();
            return e;
        }

        //עדכון מודעה לוודא שהמודעה שיכת לאותו סוחר
        public ResponseDTO UpdatePostForMerchant(int id, PostDTO PostToUpdate)
        {
            Post PostFromDB = GetPostFromDb(id);
            ResponseDTO response = new ResponseDTO();
            if (id != PostToUpdate.Id || PostToUpdate.MerchantId != GetMerchantId())
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Bad Request";
            }

            try
            {
                PostFromDB.IsShip = PostToUpdate.IsShip;
                PostFromDB.CategoryId = PostToUpdate.CategoryId;
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

        //מחיקת מודעה לוודא שהמודעה שייכת לאותו סוחר
        public ResponseDTO DeletePostForMerchant(int id)
        {
            Post PostToDelete = GetPostFromDb(id);
            ResponseDTO response = new ResponseDTO();
            if(GetMerchantId()!=PostToDelete.MerchantId)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"אין הרשאת מחיקה"
                };
            }
            if (PostToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Post with id:{id} not found in DB"
                };
            }
            m_db.Post.Remove(PostToDelete);
            m_db.SaveChanges();
            response.StatusText = $"המודעה נמחקה בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }

        //מחיקת מודעה מנהל
        public ResponseDTO DeletePostForAdmin(int id)
        {
            Post PostToDelete = GetPostFromDb(id);
            ResponseDTO response = new ResponseDTO();
            if (PostToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Post with id:{id} not found in DB"
                };
            }
            m_db.Post.Remove(PostToDelete);
            m_db.SaveChanges();
            response.StatusText = $"המודעה נמחקה בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }

        
      
    }
}
