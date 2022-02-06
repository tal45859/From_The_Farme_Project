import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  endPointApi="https://localhost:44383/api/Admin";
  constructor(private http:HttpClient) { }

      //תקציר
      //////////
      //הוספת מנהל מוגבל למנהל
      //קבלת כל המנהלים מוגבל למנהל
      //JWTקבלת מנהל לפי
      //קבלת מנהל לפי מזהה מוגבל למנהל
      //JWTעדכון מנהל לפי
      //מחיקת מנהל לפי מזהה מנהל

      //הוספת מנהל מוגבל למנהל
      async AddAdmin(obj:User,header:any)
      {
        return this.http.post(this.endPointApi+"/AddAdmin",obj, {
          headers: new HttpHeaders().set('Authorization', header)
           }).toPromise<any>();
      };

      //קבלת כל המנהלים מוגבל למנהל
      async GetAllAdmins(header:any)
      {
        return this.http.get(this.endPointApi+"/GetAllAdmins", {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      };

      //JWTקבלת מנהל לפי
      async GetAdminByJWT(header:any)
      {
        return this.http.get(this.endPointApi+"/GetAdminByJWT", {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      };

      //קבלת מנהל לפי מזהה מוגבל למנהל
      async GetAdminById(id:number,header:any)
      {
        return this.http.get(this.endPointApi+"/GetAdminById/"+id, {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      };

      //JWTעדכון מנהל לפי
      async UpdateAdmin(obj:User,header:any)
      {
      return this.http.put(this.endPointApi+"/UpdateAdmin",obj, {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
      };

      //מחיקת מנהל לפי מזהה מנהל
      async DeleteAdminById (id:number,header:any)
      {
        return this.http.delete(this.endPointApi+"/DeleteAdminById/"+id, {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      };
}
