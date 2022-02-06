using FromTheFarmer.Data;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FromTheFarmer.Services
{
    public class CategoryService
    {
        //תקציר
        /////////
        //בנאי
        //הוספת קטגוריה מוגבל למנהל     
        //קבלת כל הקטגוריות
        //קבלת קטגוריה לפי מזהה קטגוריה
        //עדכון קטגוריה מוגבל למנהל
        //מחיקת קטגוריה מוגבל למנהל

        private readonly FromTheFarmerDBContext m_db;
        //בנאי
        public CategoryService(FromTheFarmerDBContext db)
        {
            m_db = db;
        }

        //הוספת קטגוריה מוגבל למנהל   
        public bool AddCategory(CategoryDTO category)
        {
            Category category1 = new Category();
            category1.CategoryName = category.CategoryName;
            m_db.Category.Add(category1); 
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //קבלת כל הקטגוריות
        public List<Category> GetCategories()
        {
            return m_db.Category.ToList();
        }

        //קבלת קטגוריה לפי מזהה קטגוריה
        public Category GetCategory(int id)
        {
            return m_db.Category.Where(category => category.Id == id).FirstOrDefault();
        }

        //עדכון קטגוריה מוגבל למנהל
        public ResponseDTO UpdateCategory(int id, CategoryDTO CategoryToUpdate)
        {
            Category CategoryDB = GetCategory(id);
            ResponseDTO response = new ResponseDTO();
            if (id != CategoryToUpdate.Id)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Bad Request";
            }
            try
            {
                CategoryDB.CategoryName = CategoryToUpdate.CategoryName;
                int c = m_db.SaveChanges();
                if (c > 0)
                {
                    return new ResponseDTO { Status = StatusCode.Success };
                }
            }
            catch (Exception)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"לא הצלחנו לשמור את השינוי, ערך אחד או כמה אינם תקינים";
            }
            return response;
        }

        //מחיקת קטגוריה מוגבל למנהל
        public ResponseDTO DeleteCategory(int id)
        {
            Category CategoriesToDelete = GetCategory(id);
            ResponseDTO response = new ResponseDTO();
            if (CategoriesToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Category with id:{id} not found in DB"
                };
            }
            m_db.Category.Remove(CategoriesToDelete);
            m_db.SaveChanges();
            response.StatusText = $"הקטגריה נמחקה בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }
    }
}
