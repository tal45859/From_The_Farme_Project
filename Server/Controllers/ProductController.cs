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
    [Authorize(Roles = "Admin, Merchant")]
    public class ProductController : ControllerBase
    {
        //תקציר
        ///////////
        //בנאי
        //הוספת מוצר מוגבל לסוחר
        //קבלת המוצר האחרון שהסוחר העלה מוגבל לסוחר
        //קבלת כל המוצרים 
        //קבלת כל המוצרים של אותו סוחר
        //קבלת מוצר לפי מזהה מוצר
        //לעדכן מוצר מוגבל לסוחר
        //למחוק מוצר מוגבל לסוחר
        //מחיקת מוצר למנהל
        private readonly ProductService _service;


        //בנאי
        public ProductController(ProductService service)
        {
            _service = service;
        }

        //הוספת מוצר מוגבל לסוחר
        [Authorize(Roles = "Merchant")]
        [Route("AddProduct")]
        [HttpPost]
        public ActionResult Add([FromBody] ProductDTO product)
        {
            bool Ok = _service.AddProduct(product);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        //קבלת המוצר האחרון שהסוחר העלה מוגבל לסוחר
        [Authorize(Roles = "Merchant")]
        [Route("GetLastProductForMerchant")]
        [HttpGet]
        public ActionResult GetLastProductForMerchant()
        {
            Product products = _service.GetLastProductForMerchant();
            return Ok(products);
        }

        //קבלת כל המוצרים 
        [Route("GetAllProducts")]
        [HttpGet]
        public ActionResult GetAllProducts()
        {
            List<Product> Lproducts = _service.GetProducts();
            return Ok(Lproducts);
        }

        //קבלת כל המוצרים של אותו סוחר
        [Authorize(Roles = "Merchant")]
        [Route("GetAllProductsByMerchantId")]
        [HttpGet]
        public ActionResult GetAllProductsByMerchantId()
        {
            List<Product> Lproducts = _service.GetAllProductByMerchantId();
            return Ok(Lproducts);
        }

        //קבלת מוצר לפי מזהה מוצר
        [AllowAnonymous]
        [Route("GetProductById/{id}")]
        [HttpGet]
        public ActionResult GetProductById(int id)
        {
            Product products = _service.GetProductById(id);
            return Ok(products);
        }

        //לעדכן מוצר מוגבל לסוחר
        [Authorize(Roles = "Merchant")]
        [Route("UpdateProduct/{id}")]
        [HttpPut]
        public ActionResult UpdateProduct(int id, [FromBody]  ProductDTO product)
        {
            ResponseDTO res = _service.UpdateProduct(id, product);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            return Ok(res);
        }

        //למחוק מוצר מוגבל לסוחר ומנהל
        [Authorize(Roles ="Merchant")]
        [Route("DeleteProductForMerchant/{id}/{postid}")]
        [HttpDelete]
        public ActionResult DeleteForMerchant(int id, int postid)
        {
            ResponseDTO res = _service.DeleteProductForMerchant(id,postid);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            else
            {
                return Ok(res);
            }
        }
        //מחיקת מוצר למנהל
        [Authorize(Roles = "Admin")]
        [Route("DeleteProductForAdmin/{id}/{postid}")]
        [HttpDelete]
        public ActionResult DeleteForAdmin(int id,int postid)
        {
            ResponseDTO res = _service.DeleteProductForAdmin(id,postid);
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