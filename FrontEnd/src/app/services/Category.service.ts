import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  endPointApi="https://localhost:44383/api/Category";
  constructor(private http:HttpClient) { }

  //תקציר
  ////////
  //הוספת קטגוריה מוגבל למנהל
  //קבלת כל הקטגוריות
  //קבלת קטגוריה לפי מזהה קטגוריה
  //עדכון קטגוריה מוגבל למנהל
  //מחיקת קטגוריה מוגבל למנהל

    //הוספת קטגוריה מוגבל למנהל
    async AddCategory(obj:Category,header:any)
    {
      return this.http.post(this.endPointApi+"/AddCategory",obj, {
        headers: new HttpHeaders().set('Authorization', header)
        }).toPromise<any>();
    };

    //קבלת כל הקטגוריות
    async GetAllCategories(header:any)
    {
      return this.http.get(this.endPointApi+"/GetAllCategories", {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    };

    //קבלת קטגוריה לפי מזהה קטגוריה
    async GetCategoryByIdForAdmin(id:number,header:any)
    {
      return this.http.get(this.endPointApi+"/GetCategoryById/"+id, {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    };

    //עדכון קטגוריה מוגבל למנהל
    async UpdateCategory(obj:Category,header:any)
    {
    return this.http.put(this.endPointApi+"/UpdateCategoryById/"+obj.Id,obj, {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
    };

    //מחיקת קטגוריה מוגבל למנהל
    async DeleteCategory (id:number,header:any)
    {
      return this.http.delete(this.endPointApi+"/DeleteCategory/"+id, {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    };
}
