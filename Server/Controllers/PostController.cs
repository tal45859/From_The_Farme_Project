using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using FromTheFarmer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FromTheFarmer.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Merchant, Admin")]
    public class PostController : ControllerBase
    {
        //תקציר
        ///////////
        //בנאי
        //הוספת מודעה
        //קבלת רשימת מודעות לפי מזהה קטגוריה
        //קבלת המודעה האחרון שהסוחר העלה
        //קבלת רשימת מודעות לפי מזהה סוחר
        //קבלת רשימת מודעות לפי מזהה סוחר מההפצפנה מוגבל לסוחר
        //קבלת רשימת מודעות
        //קבלת מודעה לפי מזהה מודעה
        //עדכון מודעה לוודא שהמודעה שיכת לאותו סוחר מוגבל לסוחר
        //מחיקת מודעה לוודא שהמודעה שייכת לאותו סוחר מוגבל לסוחר
        //מחיקת מודעה מנהל מוגבל למנהל

        private readonly PostService _service;

        //בנאי
        public PostController(PostService service)
        {
            _service = service;
        }

        //הוספת מודעה
        [Authorize(Roles = "Merchant")]
        [Route("AddPost")]
        [HttpPost]
        public ActionResult Add([FromBody] PostDTO post)
        {
            bool Ok = _service.AddPost(post);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        //קבלת רשימת מודעות לפי מזהה קטגוריה
        [AllowAnonymous]
        [Route("GetAllPostByCategoryId/{categoryid}")]
        [HttpGet]
        public ActionResult GetAllPostByCategoryId(int categoryid)
        {
            List<Post> LPost = _service.GetAllPostByCategoryId(categoryid);
            return Ok(LPost);
        }

        //קבלת המודעה האחרון שהסוחר העלה
        [Authorize(Roles ="Merchant")]
        [Route("GetLastPostByJWT")]
        [HttpGet]
        public ActionResult GetLastPostByJWT()
        {
            Post Lpost = _service.GEtLastPostForMerchantByJwt();
            return Ok(Lpost);
        }

        //קבלת רשימת מודעות לפי מזהה סוחר
        [AllowAnonymous]
        [Route("GetPostByMerchantId/{merchantid}")]
        [HttpGet]
        public ActionResult GetPostsByMerchantId(int merchantid)
        {
            List<Post> Lpost = _service.GetAllPostsByMerchantId(merchantid);
            return Ok(Lpost);
        }

        //קבלת רשימת מודעות לפי מזהה סוחר מההפצפנה מוגבל לסוחר
        [Authorize(Roles ="Merchant")]
        [Route("GetAllPostByJWT")]
        [HttpGet]
        public ActionResult GetAllPostByJWTForMerchant()
        {
            List<Post> Lpost = _service.GetAllPostsByJWTForMerchant();
            return Ok(Lpost);
        }

        //קבלת רשימת מודעות
        [AllowAnonymous]
        [Route("GetAllPosts")]
        [HttpGet]
        public ActionResult GetAllPosts()
        {
            List<Post> AllPosts = _service.GetAllPosts();
            return Ok(AllPosts);
        }

        //קבלת מודעה לפי מזהה מודעה
        [AllowAnonymous]
        [Route("GetPost/{id}")]
        [HttpGet]
        public ActionResult GetPostById(int id)
        {
            Post post = _service.GetPost(id);
            return Ok(post);
        }


        //עדכון מודעה לוודא שהמודעה שיכת לאותו סוחר מוגבל לסוחר
        [Authorize(Roles = "Merchant")]
        [Route("UpdatePost/{id}")]
        [HttpPut]
        public ActionResult UpdatePost(int id, [FromBody] PostDTO post)
        {
            ResponseDTO res = _service.UpdatePostForMerchant(id, post);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            return Ok(res);
        }

        //מחיקת מודעה לוודא שהמודעה שייכת לאותו סוחר מוגבל לסוחר
        [Authorize(Roles = "Merchant")]
        [Route("DeleteForMerchant/{id}")]
        [HttpDelete]
        public ActionResult DeleteForMerchant(int id)
        {
            ResponseDTO res = _service.DeletePostForMerchant(id);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }

        //מחיקת מודעה מנהל מוגבל למנהל
        [Authorize(Roles = "Admin")]
        [Route("DeleteForAdmin/{id}")]
        [HttpDelete]
        public ActionResult DeleteForAdmin(int id)
        {
            ResponseDTO res = _service.DeletePostForAdmin(id);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }
    }
}