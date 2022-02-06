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
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        //תקציר
        //
        //בנאי
        //הוספת מנהל מוגבל למנהל
        //קבלת כל המנהלים מוגבל למנהל
        //JWTקבלת אוביקט מנהל מה 
        //קבלת מנהל לפי מזהה מוגבל למנהל
        //JWTעדכון מנהל לפי
        //מחיקת מנהל לפי מזהה מנהל

        private readonly AdminService _service;

        //בנאי
        public AdminController(AdminService service)
        {
            _service = service;
        }

        //הוספת מנהל מוגבל למנהל
        [Route("AddAdmin")]
        [HttpPost]
        public ActionResult Add([FromBody] UserDTO admin)
        {
            bool Ok = _service.AddAdmin(admin);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        //קבלת כל המנהלים מוגבל למנהל
        [Route("GetAllAdmins")]
        [HttpGet]
        public ActionResult GetAllAdmins()
        {
            List<User> alladmins = _service.GetAllAdmins();
            alladmins.ForEach(u => u.Password = null);
            return Ok(alladmins);
        }

        //JWTקבלת אוביקט מנהל מה 
        [Route("GetAdminByJWT")]
        [HttpGet]
        public ActionResult GetAdminByJWT()
        {
            User admin = _service.GetAdminByJWT();
            return Ok(admin);
        }

        //קבלת מנהל לפי מזהה מוגבל למנהל
        [Route("GetAdminById/{id}")]
        [HttpGet]
        public ActionResult GetAdminById(int id)
        {
            User admin = _service.GetAdminById(id);
            admin.Password = null;
            return Ok(admin);
        }

        //JWTעדכון מנהל לפי
        [Route("UpdateAdmin")]
        [HttpPut]
        public ActionResult UpdateADmin( [FromBody] UserDTO admin)
        {
            ResponseDTO res = _service.UpdateAdminByJWT(admin);
            if(res.Status==Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            return Ok(res);
        }

        //מחיקת מנהל לפי מזהה מנהל 
        [Route("DeleteAdminById/{id}")]
        [HttpDelete]
        public ActionResult DeleteAdminById(int id)
        {
            ResponseDTO res = _service.DeleteAdminById(id);
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