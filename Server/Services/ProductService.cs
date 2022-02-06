using FromTheFarmer.Data;
using FromTheFarmer.Data.DTO;

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using FromTheFarmer.Data.Entities;

namespace FromTheFarmer.Services
{
    public class ProductService
    {
        //תקציר
        ///////////
        //בנאי
        //קבלת מזהה סוחר מהסרויס של הסוחר
        //הוספת מוצר
        //קבלת המוצר האחרון שהסוחר העלה 
        //קבלת מוצר לשימוש פנימי נקי מאוביקטים
        //קבלת כל המוצרים 
        //קבלת כל המוצרים של אותו סוחר
        //קבלת מוצר לפי מזהה מוצר
        //לעדכן מוצר ולוודא שהמוצר שייך לאותו סוחר
        //למחוק מוצר ולודא שהוא שיך לאותו סוחר
        //מחיקת מוצר למנהל




        private readonly FromTheFarmerDBContext m_db;
        private readonly MerchantService _merchantService;
        private readonly JwtService _JwtService;
        private readonly ImageService _ImageService;

        //בנאי
        public ProductService(FromTheFarmerDBContext db, MerchantService mService, JwtService jwtservice, ImageService imageService)
        {
            m_db = db;
            _merchantService = mService;
            _JwtService = jwtservice;
            _ImageService = imageService;
        }

        //קבלת מזהה סוחר מהסרויס של הסוחר
        public int GetMerchantId()
        {
           return _merchantService.GetMerchantId();
        }

        //הוספת מוצר
        public bool AddProduct(ProductDTO product)
        {
            Product product1 = new Product();
            product1.ProductName = product.ProductName;
            product1.MerchantId = GetMerchantId();
            product1.UnitPrice = product.UnitPrice;
            product1.UnitInStock = product.UnitInStock;
            product1.MoreInfo = product.MoreInfo;
            m_db.Product.Add(product1); 
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //קבלת המוצר האחרון שהסוחר העלה 
        public Product GetLastProductForMerchant()
        {
            int merchantid = GetMerchantId();
            var e = m_db.Product.Where(Product => Product.MerchantId == merchantid).Select(ee => new Product()
            {
                Id = ee.Id,
                ProductName = ee.ProductName,
                MerchantId = ee.MerchantId,
                UnitPrice = ee.UnitPrice,
                UnitInStock = ee.UnitInStock,
                MoreInfo = ee.MoreInfo
            }).ToList();
            return e.Last();
        }

        //קבלת מוצר לשימוש פנימי נקי מאוביקטים
        private Product GetProductFromDb(int id)
        {
            return m_db.Product.Where(product => product.Id == id).FirstOrDefault();
        }

        //קבלת כל המוצרים 
        public List<Product> GetProducts()
        {
            var e = m_db.Product.Select(ee => new Product()
            {
                Id = ee.Id,
                ProductName = ee.ProductName,
                MerchantId = ee.MerchantId,
                UnitPrice = ee.UnitPrice,
                UnitInStock = ee.UnitInStock,
                MoreInfo = ee.MoreInfo
            }).ToList();
            return e;
        }

        //קבלת כל המוצרים של אותו סוחר
        public List<Product> GetAllProductByMerchantId()
        {
            int merchantid = GetMerchantId();
            var e = m_db.Product.Where(p=>p.MerchantId==merchantid).Select(ee => new Product()
            {
                Id = ee.Id,
                ProductName = ee.ProductName,
                MerchantId = ee.MerchantId,
                UnitPrice = ee.UnitPrice,
                UnitInStock = ee.UnitInStock,
                MoreInfo = ee.MoreInfo
            }).ToList();
            return e;
        }

        //קבלת מוצר לפי מזהה מוצר
        public Product GetProductById(int id)
        {
            var e = m_db.Product.Where(Product => Product.Id == id).Select(ee => new Product()
            {
                Id = ee.Id,
                ProductName = ee.ProductName,
                MerchantId = ee.MerchantId,
                UnitPrice = ee.UnitPrice,
                UnitInStock = ee.UnitInStock,
                MoreInfo = ee.MoreInfo
            }).FirstOrDefault();
            return e;
        }

        //לעדכן מוצר ולוודא שהמוצר שייך לאותו סוחר
        public ResponseDTO UpdateProduct(int id, ProductDTO ProductToUpdate)
        {
            Product ProductFromDB = GetProductFromDb(id);
            ResponseDTO response = new ResponseDTO();
            if (id != ProductToUpdate.Id || GetMerchantId()!= ProductToUpdate.MerchantId)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Bad Request";
            }
            try
            {
                ProductFromDB.ProductName = ProductToUpdate.ProductName;
                ProductFromDB.UnitPrice = ProductToUpdate.UnitPrice;
                ProductFromDB.UnitInStock = ProductToUpdate.UnitInStock;
                ProductFromDB.MoreInfo = ProductToUpdate.MoreInfo;
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

        //למחוק מוצר ולודא שהוא שיך לאותו סוחר
        public ResponseDTO DeleteProductForMerchant(int id ,int postid)
        {
            Product ProductToDelete = GetProductFromDb(id);
            ResponseDTO response = new ResponseDTO();
            if (ProductToDelete.MerchantId != GetMerchantId()) 
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"לא מורשה למחוק מוצר"
                };
            }
            if (ProductToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Product with id:{id} not found in DB"
                };
            }
            List<Image> Imagelist = m_db.Image.Where(i => i.PostId == postid).ToList();
            for(int i=0;i<Imagelist.Count;i++)
            {
               ResponseDTO res= _ImageService.DeleteImage(Imagelist[i].Id);
                if(res.Status==Data.DTO.StatusCode.Error)
                {
                    return new ResponseDTO { Status = Data.DTO.StatusCode.Error, StatusText = $"שגיאה  קשה" };
                }
            }
            m_db.Product.Remove(ProductToDelete);
            m_db.SaveChanges();
            response.StatusText = $"המשתמש נמחק בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }

        //מחיקת מוצר למנהל
        public ResponseDTO DeleteProductForAdmin(int id, int postid)
        {
            Product ProductToDelete = GetProductFromDb(id);
            ResponseDTO response = new ResponseDTO();
            User user =m_db.User.Where(u=>u.Id==int.Parse(_JwtService.GetTokenClaims())).FirstOrDefault();
            if (user.Role!="Admin")
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"לא מורשה למחוק מוצר"
                };
            }
            if (ProductToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Product with id:{id} not found in DB"
                };
            }
            List<Image> Imagelist = m_db.Image.Where(i => i.PostId == postid).ToList();
            for (int i = 0; i < Imagelist.Count; i++)
            {
                ResponseDTO res = _ImageService.DeleteImageforAdmin(Imagelist[i].Id);
                if (res.Status == Data.DTO.StatusCode.Error)
                {
                    return new ResponseDTO { Status = Data.DTO.StatusCode.Error, StatusText = $"שגיאה  קשה" };
                }
            }
            m_db.Product.Remove(ProductToDelete);
            m_db.SaveChanges();
            response.StatusText = $"המשתמש נמחק בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }

       
    }
}
