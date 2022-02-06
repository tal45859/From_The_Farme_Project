using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using FromTheFarmer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace FromTheFarmer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Merchant")]
    public class ImageController : ControllerBase
    {
        //תקציר
        //////////////
        //בנאי
        //הוספת תמונה חדשה
        //קבלת רשימת תמונות של אותו סוחר על פי מזהה סוחר מההצפנה מוגבל לסוחר
        //קבלת כל התמונות
        //קבלת רשימת תמונות לפי מזהה מודעה
        //קבלת תמונה לפי מזהה
        //מחיקת תמונה לוודא שזה סוחר מוגבל לסוחר
        //הוספת תמונה ישירות לתיקיה
        //בדיקת תקינות התמונה

        private readonly ImageService _service;

        //בנאי
        public ImageController(ImageService service)
        {
            _service = service;
        }

        //הוספת תמונה חדשה
        [Route("AddImage")]
        [HttpPost]
        public ActionResult Add([FromBody] ImageDTO postImage)
        {
            bool Ok = _service.AddImage(postImage);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        //קבלת רשימת תמונות של אותו סוחר על פי מזהה סוחר מההצפנה מוגבל לסוחר
        [Route("GetAllImageByJWTForMerchant")]
        [HttpGet]
        public ActionResult GetAllImageByJWTForMerchant()
        {
            List<Image> LImage = _service.GetAllImagesByMerchantIdFromJWT();
            return Ok(LImage);
        }

        //קבלת כל התמונות
        [AllowAnonymous]
        [Route("GetAllImages")]
        [HttpGet]
        public ActionResult GetAllImages()
        {
            List<Image> LImage = _service.GetAllImages();
            return Ok(LImage);
        }

        //קבלת רשימת תמונות לפי מזהה מודעה
        [AllowAnonymous]
        [Route("GetImagesByPostId/{id}")]
        [HttpGet]
        public ActionResult GetImagesByPostId(int id)
        {
            List<Image> image = _service.GetImagesByPostId(id);
            return Ok(image);
        }

        //קבלת תמונה לפי מזהה
        [AllowAnonymous]
        [Route("GetImageById/{id}")]
        [HttpGet]
        public ActionResult GetImageById(int id)
        {
            Image image = _service.GetImageById(id);
            return Ok(image);
        }




        //מחיקת תמונה לוודא שזה סוחר מוגבל לסוחר
        [Route("DeleteImage/{id}")]
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            ResponseDTO res = _service.DeleteImage(id);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }

        //הוספת תמונה ישירות לתיקיה
        [AllowAnonymous]
        [Route("Add")]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("StaticFiles", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Replace(" ","");
                    var fullPath = Path.Combine(pathToSave, fileName);
                    //string urlToDB = "https://localhost:44383/StaticFiles/Images/StaticFiles/Images/" + fileName.ToString();
                    string urlToDB = "https://localhost:44383/StaticFiles/Images/" + fileName.ToString();

                    if (IsAPhotoFile(fileName))
                    {
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                        return Ok(new { urlToDB });
                    }
                    return BadRequest();                  
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        //בדיקת תקינות התמונה
        private bool IsAPhotoFile(string fileName)
        {
            return fileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                   || fileName.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                   || fileName.EndsWith(".png", StringComparison.OrdinalIgnoreCase);
        }
    }
}