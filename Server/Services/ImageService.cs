using FromTheFarmer.Data;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace FromTheFarmer.Services
{
    public class ImageService
    {
        //תקציר
        //////////////
        //בנאי
        //קבלת מזהה סוחר מסרויס סוחר
        //הוספת תמונה חדשה
        //קבלת רשימת תמונות של אותו סוחר על פי מזהה סוחר מההצפנה מוגבל לסוחר
        //קבלת כל התמונות
        //קבלת רשימת תמונות לפי מזהה מודעה
        //קבלת תמונה לפי מזהה
        //מחיקת תמונה לוודא שזה סוחר
        //מחיקת תמונה לוודא שזה מנהל

        private readonly MerchantService _merchantService;
        private readonly FromTheFarmerDBContext m_db;

        //בנאי
        public ImageService(FromTheFarmerDBContext db, MerchantService merchantService)
        {
            m_db = db;
            _merchantService = merchantService;
        }

        //קבלת מזהה סוחר מסרויס סוחר
        public int GetMerchantIdByJwt()
        {
            return _merchantService.GetMerchantId();
        }


        //הוספת תמונה חדשה
        public bool AddImage(ImageDTO postImage)
        {
            Image postImage1 = new Image();      
            postImage1.Img = "https://localhost:44383/StaticFiles/Images/"+ postImage.Img;
            postImage1.PostId = postImage.PostId;
            postImage1.MerchantId = GetMerchantIdByJwt();
            m_db.Image.Add(postImage1);
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //קבלת רשימת תמונות של אותו סוחר על פי מזהה סוחר מההצפנה מוגבל לסוחר
        public List<Image> GetAllImagesByMerchantIdFromJWT()
        {
            return m_db.Image.Where(i => i.MerchantId == GetMerchantIdByJwt()).ToList();
        }

        //קבלת כל התמונות
        public List<Image> GetAllImages()
        {
            return m_db.Image.ToList();
        }

        //קבלת רשימת תמונות לפי מזהה מודעה
        public List<Image> GetImagesByPostId(int postid)
        {
            return m_db.Image.Where(Image => Image.PostId == postid).ToList();
        }

        //קבלת רשימת תמונות לפי מזהה 
        public Image GetImageById(int id)
        {
            return m_db.Image.Where(Image => Image.Id == id).FirstOrDefault();
        }

        //מחיקת תמונה לוודא שזה סוחר
        public ResponseDTO DeleteImage(int id)
        {
            Image PostImageToDelete = GetImageById(id);
            ResponseDTO response = new ResponseDTO();
            if (PostImageToDelete.MerchantId !=GetMerchantIdByJwt())
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"אין הרשאת מחיקה"
                };
            }
            if (PostImageToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Image with id:{id} not found in DB"
                };
            }
            string url = "https://localhost:44383/";
            string UrlToDelete = PostImageToDelete.Img.Substring(url.Length, PostImageToDelete.Img.Length - url.Length);
            var PathToDelete = Path.Combine(Directory.GetCurrentDirectory(), UrlToDelete);
            FileInfo file = new FileInfo(PathToDelete);
            try
            {
                file.Delete();
                m_db.Image.Remove(PostImageToDelete);
                m_db.SaveChanges();
            }
            catch
            {
                response.StatusText = $"לא הצלחנו למחוק את התמונה";
                response.Status = StatusCode.Error;
                return response;
            }
            response.StatusText = $"התמונה נמחקה בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }

        //מחיקת תמונה לוודא שזה מנהל
        public ResponseDTO DeleteImageforAdmin(int id)
        {
            Image PostImageToDelete = GetImageById(id);
            ResponseDTO response = new ResponseDTO();
            if (PostImageToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Image with id:{id} not found in DB"
                };
            }
            string url = "https://localhost:44383/";
            string UrlToDelete = PostImageToDelete.Img.Substring(url.Length, PostImageToDelete.Img.Length - url.Length);
            var PathToDelete = Path.Combine(Directory.GetCurrentDirectory(), UrlToDelete);
            FileInfo file = new FileInfo(PathToDelete);
            try
            {
                file.Delete();
                m_db.Image.Remove(PostImageToDelete);
                m_db.SaveChanges();
            }
            catch
            {
                response.StatusText = $"לא הצלחנו למחוק את התמונה";
                response.Status = StatusCode.Error;
                return response;
            }
            response.StatusText = $"התמונה נמחקה בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }
    }
}