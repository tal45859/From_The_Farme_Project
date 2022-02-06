using FromTheFarmer.Data;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using FromTheFarmer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Customer")]
    public class FavoriteController : ControllerBase
    {
        //תקציר
        //בנאי
        //JWT הוספת מועדף על פי 
        //JWT קבלת רשימת מעודפים על פי 
        //JWTמחיקת מעודף על פי מזהה לקוח ו

        private readonly FavoriteService _service;

        //בנאי
        public FavoriteController(FavoriteService service)
        {
            _service = service;
        }

        //JWT הוספת מועדף על פי 
        [Route("AddFavorite")]
        [HttpPost]
        public ActionResult AddFavorite([FromBody] int postid)
        {
            bool isok = _service.AddFavorite(postid);
            if (isok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        //JWT קבלת רשימת מעודפים על פי 
        [Route("GetAllFavoriteByJWT")]
        [HttpGet]
        public ActionResult GetAllFavoriteByJWT()
        {
            List<Favorite> ListFavorite = _service.GetAllFavoriteByJwt();
            ListFavorite.ForEach(f => f.Post.Merchant.User.Password = null);
            ListFavorite.ForEach(f => f.Post.Merchant.User.Mail = null);
            if (ListFavorite == null)
            {
                return BadRequest();
            }
            return Ok(ListFavorite);
        }

        //JWTמחיקת מעודף על פי מזהה לקוח ו
        [Route("DeleteFavorite/{id}")]
        [HttpDelete]
        public ActionResult DeleteFavorite(int id)
        {
            ResponseDTO res = _service.DeleteFavorite(id);
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
