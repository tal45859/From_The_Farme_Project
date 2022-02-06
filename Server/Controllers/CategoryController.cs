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
    public class CategoryController : ControllerBase
    {
        //תקציר
        /////////
        //בנאי
        //הוספת קטגוריה מוגבל למנהל     
        //קבלת כל הקטגוריות
        //קבלת קטגוריה לפי מזהה קטגוריה
        //עדכון קטגוריה מוגבל למנהל
        //מחיקת קטגוריה מוגבל למנהל

        private readonly CategoryService _service;

        //בנאי
        public CategoryController(CategoryService service)
        {
            _service = service;
        }

        //הוספת קטגוריה מוגבל למנהל    
        [Route("AddCategory")]
        [HttpPost]
        public ActionResult AddCategory([FromBody] CategoryDTO Category)
        {
            bool Ok = _service.AddCategory(Category);
            if (Ok)
            {
                return Created("", null);
            }
            return BadRequest();
        }

        //קבלת כל הקטגוריות
        [AllowAnonymous]
        [Route("GetAllCategories")]
        [HttpGet]
        public ActionResult GetAllCategories()
        {
            List<Category> categorey = _service.GetCategories();
            return Ok(categorey);
        }

        //קבלת קטגוריה לפי מזהה קטגוריה
        [AllowAnonymous]
        [Route("GetCategoryById/{id}")]
        [HttpGet]
        public ActionResult GetCategoryById(int id)
        {
            Category category = _service.GetCategory(id);
            return Ok(category);
        }

        //עדכון קטגוריה מוגבל למנהל
        [Route("UpdateCategoryById/{id}")]
        [HttpPut]
        public ActionResult Update(int id, [FromBody] CategoryDTO categorie)
        {
            ResponseDTO res = _service.UpdateCategory(id, categorie);
            if (res.Status == Data.DTO.StatusCode.Error)
            {
                return BadRequest(res);
            }
            return Ok(res);
        }

        //מחיקת קטגוריה מוגבל למנהל
        [Route("DeleteCategory/{id}")]
        [HttpDelete]
        public ActionResult DeleteCategoryForAdmin(int id)
        {
            ResponseDTO res = _service.DeleteCategory(id);
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