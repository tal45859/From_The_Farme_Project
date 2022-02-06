import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../model/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  endPointApi="https://localhost:44383/api/Image";
  constructor(private http:HttpClient) { }

    //תקציר
    //////////////
    //הוספת תמונה חדשה
    //הוספת תמונה לתיקיה
    //קבלת רשימת תמונות של אותו סוחר על פי מזהה סוחר מההצפנה מוגבל לסוחר
    //קבלת כל התמונות
    //קבלת רשימת תמונות לפי מזהה מודעה
    //קבלת תמונה לפי מזהה
    //מחיקת תמונה מוגבל לסוחר

    //הוספת תמונה חדשה
  async AddImage(obj:Image,header:any)
  {
    return this.http.post(this.endPointApi+"/AddImage",obj, {
      headers: new HttpHeaders().set('Authorization', header)
       }).toPromise<any>();
  };

  //הוספת תמונה לתיקיה
  async AddOnleyImageNew(file:FormData, header:any)
  {
    return this.http.post(this.endPointApi+"/Add",file,{
      headers: new HttpHeaders().set('Authorization', header)
       }).toPromise<any>();
  };

  //קבלת רשימת תמונות של אותו סוחר על פי מזהה סוחר מההצפנה מוגבל לסוחר
  async GetAllImagesByMerchantIdFromJWT(header:any)
    {
      return this.http.get(this.endPointApi+"/GetAllImageByJWTForMerchant", {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    };

  //קבלת כל התמונות
  async GetAllImages()
  {
    return this.http.get(this.endPointApi+"/GetAllImages").toPromise<any>();
  }

  //קבלת רשימת תמונות לפי מזהה מודעה
  async GetImagesByPostId(postid:number)
  {
    return this.http.get(this.endPointApi+"/GetImagesByPostId/"+postid).toPromise<any>();
  }

  //קבלת תמונה לפי מזהה
  async getSingleImage(id:number)
  {
    return this.http.get(this.endPointApi+"/GetImageById/"+id).toPromise<any>();
  }


  //מחיקת תמונה מוגבל לסוחר
  async deleteImage(id:number,header:any)
{
  return this.http.delete(this.endPointApi+"/DeleteImage/"+id, {
    headers: new HttpHeaders().set('Authorization', header),
  }).toPromise<any>();
};
}
