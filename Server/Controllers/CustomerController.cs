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
    [Authorize(Roles = "Admin, Customer")]
    public class CustomerController : ControllerBase
    {
        //תקציר
        ///////////
        //בנאי
        //הוספת לקוח
        //JWTקבלת לקוח על פי 
        //קבלת לקוח על פי מזהה מוגבל למנהל
        //קבלת כל הלקוחותת מוגבל למנהל  
        //JWTעדכון לקוח מה
        //JWTמחיקת לקוח מה
        // והוספה לטבלת סוחריםJWT מחיקת לקוח מה

        private readonly CustomerService _service;

        //בנאי
        public CustomerController(CustomerService service)
        {
            _service = service;
        }

        //הוספת לקוח
        [AllowAnonymous]
        [Route("AddCustomer")]
        [HttpPost]
        public ActionResult AddCustomer([FromBody]CustomerDTO customer)
        {
            bool Ok = _service.AddCustomer(customer);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        //JWTקבלת לקוח על פי
        [Authorize(Roles = "Customer")]
        [Route("GetCustomerByJWT")]
        [HttpGet]
        public ActionResult GetCustomerByJWT()
        {
            Customer customer = _service.GetCustomerByJWT();
            return Ok(customer);
        }

        //קבלת לקוח על פי מזהה מוגבל למנהל
        [Authorize(Roles ="Admin")]
        [Route("GetCustomerByIdForAdmin/{id}")]
        [HttpGet]
        public ActionResult GetCustomerByIdForAdmin(int id)
        {
            Customer customer = _service.GetCustomerByIdForAdmin(id);
            customer.User.Password = null;
            return Ok(customer);
        }

        //קבלת כל הלקוחותת מוגבל למנהל  
        [Authorize(Roles ="Admin")]
        [Route("GetAllCustomersForAdmin")]
        [HttpGet]
        public ActionResult GetAllCustomersForAdmin()
        {
            List<Customer> AllCustomers = _service.GetAllCustomersForAdmin();
            AllCustomers.ForEach(c => c.User.Password = null);
            return Ok(AllCustomers);
        }

        //JWTעדכון לקוח מה
        [Authorize(Roles = "Customer")]
        [Route("UpdateCustomer")]
        [HttpPut]
        public ActionResult UpdateCustomer([FromBody] CustomerDTO customer)
        {
            ResponseDTO res = _service.UpdateCustomer(customer);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            return Ok(res);
        }

        //JWTמחיקת לקוח מה
        [Authorize(Roles = "Customer")]
        [Route("DeleteCustomer")]
        [HttpDelete]
        public ActionResult DeleteCustomer()
        {
            ResponseDTO res = _service.DeleteCustomer();
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }

        // והוספה לטבלת סוחריםJWT מחיקת לקוח מה
        [Authorize(Roles = "Customer")]
        [Route("DeleteCustomerToAddMerchantByJwt")]
        [HttpDelete]
        public ActionResult DeleteCustomerToAddMerchantByJwt()
        {
            ResponseDTO res = _service.DeleteCustomerAndAddMerchant();
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