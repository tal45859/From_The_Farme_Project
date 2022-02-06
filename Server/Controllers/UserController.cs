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
    [Authorize(Roles = "Merchant,Admin,Customer")]
    public class UserController : ControllerBase
    {
        // תקציר
        /////////
        //בנאי
        //הזדאות וקבלת תוקן
        // קבלת משתמש על פי מייל
        // קבלת רשימת משתמשים
        // קבלת משתמש על פי מזהה
        //קבלת משתמש על פי JWT
        //קבלת רשימת משתמשים שהם לא מנהלים מוגבל למנהל
        // הוספת משתמש
        // בדיקת האם קיים מייל
        //עדכון רול למשתמש מוגבל למנהל
        //עדכון משתמש
        //מחיקת משתמש לאדמין
        //מחיקת משתמש

        //בנאי
        private readonly UserService _service;
        public UserController(UserService service)
        {
            _service = service;

        }
  
        //הזדאות וקבלת תוקן
        [AllowAnonymous]
        [Route("{auth}")]
        [HttpPost]
        public IActionResult Auth([FromBody]AuthRequestDTO request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("יש להזין אימל וסיסמה");
            }
            User UserFoundinDb = _service.GetUserForLogin(request.Email, request.Password);
            if (UserFoundinDb != null)
            {
                 _service.UpdateLastLogin(UserFoundinDb);
                string token = _service.GetToken(UserFoundinDb.Id.ToString(), UserFoundinDb.Role);
                return Ok(token);
            }
            return Unauthorized("משתמש לא מזוהה במערכת");
        }

        // קבלת משתמש על פי מייל
        [AllowAnonymous]
        [Route("GetUserByMail/{Mail}")]
        [HttpGet]
        public ActionResult GetUserByMail(string Mail)
        {
            User U = _service.GetUserEmail(Mail);
           // U.Password = null;
            if (U == null)
            {
                return BadRequest();
            }
            return Ok(U);
        }

        // קבלת רשימת משתמשים
        [AllowAnonymous]
        [Route("GetAllUsers")]
        [HttpGet]
        public ActionResult GetData()
        {
            List<User> result = _service.GetUsers();
            result.ForEach(u => u.Password = null);
            result.ForEach(u => u.Mail = null);
            return Ok(result);
        }

        // קבלת משתמש על פי מזהה
        [AllowAnonymous]
        [Route("GetSingleUser/{id}")]
        [HttpGet]
        public ActionResult GetSingleData(int id)
        {
            User result2 = _service.GetUser(id);
            result2.Password = null;
            result2.Mail = null;
            return Ok(result2);
        }

        //קבלת משתמש על פי JWT
        [AllowAnonymous]
        [Route("GetUserByJwt")]
        [HttpGet]
        public ActionResult GetUserByJwt()
        {
            User UserToSend =_service.GetUserByJWT();
            return Ok(UserToSend);
        }

        //קבלת רשימת משתמשים שהם לא מנהלים מוגבל למנהל
        [Authorize(Roles ="Admin")]
        [Route("GetAllUsersNotAdmin")]
        [HttpGet]
        public ActionResult GetAllUsersNotAdmin()
        {
            List<User> UserList = _service.GetAllUsersNotAdmin();
            UserList.ForEach(u => u.Password = null);
            return Ok(UserList);
        }

        // הוספת משתמש     
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Add([FromBody] UserDTO user)
        {
            bool Ok = _service.AddUser(user);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        // בדיקת האם קיים מייל
        [AllowAnonymous]
        [HttpGet]
        [Route("CheckEmail/{Email}")]
        public ActionResult CheckEmail(string Email)
        {
            return Ok(_service.CheckEmail(Email));
        }


        //עדכון רול למשתמש מוגבל למנהל
        [Authorize(Roles = "Admin")]
        [Route("UpdateUserRoleForAdmin/{id}")]
        [HttpPut]//עדכון
        public ActionResult UpdateUserRole(int id, [FromBody] UserDTO user)
        {
            ResponseDTO res = _service.UpdateUserRoleForAdmin(id, user);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            return Ok(res);
        }

        //עדכון משתמש
        [Route("UpdateUser")]
        [HttpPut]
        public ActionResult UpdateUser([FromBody] UserDTO user)
        {
            ResponseDTO res = _service.UpdateUser( user);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            return Ok(res);
        }


        //מחיקת משתמש לאדמין
        [Authorize(Roles ="Admin")]
        [Route("DeleteUserForAdmin/{id}")]
        [HttpDelete]
        public ActionResult DeleteUserForAdmin(int id)
        {
            ResponseDTO res = _service.DeleteUserForAdmin(id);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }

        //מחיקת משתמש 
        [Route("DeleteUserByJWT")]
        [HttpDelete]
        public ActionResult Delete()
        {
            ResponseDTO res = _service.DeleteUser();
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }

        [AllowAnonymous]
        [Route("ForgotPassword/{mail}")]
        [HttpGet]
        public ActionResult ForgotPassword(string mail)
        {
            bool isOk = _service.ForgotPassword(mail);
            if (isOk)
            {
                return Ok();
            }
            return BadRequest();
                   
        }


    }
}
