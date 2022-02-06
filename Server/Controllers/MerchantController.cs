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
    public class MerchantController : ControllerBase
    {
        //תקציר
        ///////////
        //בנאי
        //הוספת סוחר חדש
        //החזרת כל הסוחרים
        // IDהחזרת סוחר על פי 
        //JWT מחזיר סוחר על פי מזהה סוחר מה
        //JWT מחיקת סוחר על פי 
        //מחיקת סוחר על פי מזהה מוגבל למנהל
        //JWTעדכון סוחר על פי מזהה מה

        private readonly MerchantService _service;

        //בנאי
        public MerchantController(MerchantService service)
        {
            _service = service;
        }

        //הוספת סוחר חדש
        [AllowAnonymous]
        [Route("AddMerchant")]
        [HttpPost]
        public ActionResult Add([FromBody] MerchantDTO merchant)
        {
            bool Ok = _service.AddMerchant(merchant);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        //החזרת כל הסוחרים
        [Authorize(Roles ="Admin")]
        [Route("GetAllMerchants")]
        [HttpGet]
        public ActionResult GetAllMerchant()
        {
            List<MerchantDTO> result = _service.GetMerchants();
            result.ForEach(f => f.User.Password = null);//להסתיר לו לו את הסיסמה
            return Ok(result);
        }

        //IDהחזרת סוחר על פי 
        [AllowAnonymous]
        [Route("GetMerchantById/{id}")]
        [HttpGet]
        public ActionResult GetMerchantById(int id)
        {
            Merchant result2 = _service.GetMerchantById(id);
            result2.User.Mail = null;
            result2.User.Password = null;
            return Ok(result2);
        }

        //JWT מחזיר סוחר על פי מזהה סוחר מה
        [Authorize(Roles ="Merchant")]
        [Route("GetMerchantByJwt")]
        [HttpGet]
        public ActionResult GetMerchantByJwt()
        {
            Merchant result2 = _service.GetMerchantByJwt();
            return Ok(result2);
        }

        //JWT מחיקת סוחר על פי
        [Authorize(Roles = "Merchant")]
        [Route("DeleteMerchantByJWT")]
        [HttpDelete]
        public ActionResult DeleteMerchantByJWT()
        {
            ResponseDTO res = _service.DeleteMerchantByJWt();
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }

        //מחיקת סוחר על פי מזהה מוגבל למנהל
        [Authorize(Roles = "Admin")]
        [Route("DeleteMerchantByIdForAdmin/{id}")]
        [HttpDelete]
        public ActionResult DeleteMerchantByIdForAdmin(int id)
        {
            if (id == 0)
            {
                return BadRequest(new ResponseDTO { Status = Data.DTO.StatusCode.Error, StatusText = $"לא התקבל מזהה" });
            }
            ResponseDTO res = _service.DeleteMerchantByIdForAdmin(id);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }

        //JWTעדכון סוחר על פי מזהה מה
        [Authorize(Roles = "Merchant")]
        [Route("UpdateMerchantByJWT")]
        [HttpPut]
        public ActionResult UpdateMerchantByJWT( [FromBody] MerchantDTO merchant)
        {
            ResponseDTO res = _service.UpdateMerchantByJwt(merchant);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            return Ok(res);
        }
    }
}
