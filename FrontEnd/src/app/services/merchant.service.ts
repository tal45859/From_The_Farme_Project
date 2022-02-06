import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchant } from '../model/Merchant';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  endPointApi="https://localhost:44383/api/Merchant";
  constructor(private http:HttpClient) { }

  //תקציר
  ///////
  //החזרת כל הסוחרים
  //הוספת סוחר חדש
  //JWTעדכון סוחר על פי
  // IDהחזרת סוחר על פי
  //JWT מחזיר סוחר על פי
  //JWT מחיקת סוחר על פי
  //מחיקת סוחר על פי מזהה מוגבל למנהל






  //החזרת כל הסוחרים
  async GetAllMerchants(header:any)
  {
    return this.http.get(this.endPointApi+"/GetAllMerchants", {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

  //הוספת סוחר חדש
  async addMerchant(obj:Merchant)
  {
    return this.http.post(this.endPointApi+"/AddMerchant",obj).toPromise<any>();
  };

  //JWTעדכון סוחר על פי
  async updateMerchant(obj:Merchant,header:any)
  {
  return this.http.put(this.endPointApi+"/UpdateMerchantByJWT",obj, {
    headers: new HttpHeaders().set('Authorization', header),
  }).toPromise<any>();
  };

  // IDהחזרת סוחר על פי
  async GetMerchantById(id:number)
  {
    return this.http.get(this.endPointApi+"/GetMerchantById/"+id).toPromise<any>();
  }

  //JWT מחזיר סוחר על פי
  async GetMerchantByJwt(header:any)
  {
    return this.http.get(this.endPointApi+"/GetMerchantByJwt", {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

  //JWT מחיקת סוחר על פי
  async DeleteMerchantForMerchant(header:any)
  {
    return this.http.delete(this.endPointApi+"/DeleteMerchantByJWT/", {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

   //מחיקת סוחר על פי מזהה מוגבל למנהל
  async DeleteMerchantForAdmin(id:number,header:any)
  {
    return this.http.delete(this.endPointApi+"/DeleteMerchantByIdForAdmin/"+id, {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

}
