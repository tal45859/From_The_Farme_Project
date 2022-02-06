import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  endPointApi="https://localhost:44383/api/Post";
  constructor(private http:HttpClient) { }

  //תקציר
  /////////////
  //הוספת מודעה
  //קבלת רשימת מודעות לפי מזהה קטגוריה
  //קבלת המודעה האחרון שהסוחר העלה
  //קבלת רשימת מודעות לפי מזהה סוחר
  //קבלת רשימת מודעות מוגבל לסוחר
  //קבלת רשימת מודעות
  //קבלת מודעה לפי מזהה מודעה
  //עדכון מודעה מוגבל לסוחר
  //מחיקת מודעה מוגבל לסוחר
  //מחיקת מודעה מוגבל לאדמין

  //הוספת מודעה
  async addPost(obj:Post,header:any)
  {
    return this.http.post(this.endPointApi+"/AddPost",obj, {
      headers: new HttpHeaders().set('Authorization', header)
       }).toPromise<any>();
  };

  //קבלת רשימת מודעות לפי מזהה קטגוריה
  async GetAllPostByCategoryId(categoryid:number)
  {
     return this.http.get(this.endPointApi+"/GetAllPostByCategoryId/"+categoryid).toPromise<any>();
  };

  //קבלת המודעה האחרון שהסוחר העלה
  async GetLastPostByJWT(header:any)
  {
      return this.http.get(this.endPointApi+"/GetLastPostByJWT"  , {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

//קבלת מודעה לפי מזהה סוחר
  async GetPostByMerchantId(merchantid:number)
  {
     return this.http.get(this.endPointApi+"/GetPostByMerchantId/"+merchantid).toPromise<any>();
  };

  //קבלת רשימת מודעות מוגבל לסוחר
  async GetAllPostByJWT(header:any)
  {
     return this.http.get(this.endPointApi+"/GetAllPostByJWT"  , {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

  //קבלת כל המודעות
  async GetAllPosts()
  {
     return this.http.get(this.endPointApi+"/GetAllPosts").toPromise<any>();
  };

  //קבלת מודעה לפי מזהה מודעה
  async GetPost(id:number)
  {
    return this.http.get(this.endPointApi+"/GetPost/"+id).toPromise<any>();
  };

//עדכון מודעה מוגבל לסוחר
  async UpdatePost(obj:Post,header:any)
  {
  return this.http.put(this.endPointApi+"/UpdatePost/"+obj.Id,obj, {
    headers: new HttpHeaders().set('Authorization', header),
  }).toPromise<any>();
  };


//מחיקת מודעה מוגבל לסוחר
async DeleteForMerchant(id:number,header:any)
{
  return this.http.delete(this.endPointApi+"/DeleteForMerchant/"+id, {
    headers: new HttpHeaders().set('Authorization', header),
  }).toPromise<any>();
};

//מחיקת מודעה מוגבל לאדמין
async DeleteForAdmin(id:number,header:any)
{
  return this.http.delete(this.endPointApi+"/DeleteForAdmin/"+id, {
    headers: new HttpHeaders().set('Authorization', header),
  }).toPromise<any>();
};

}
