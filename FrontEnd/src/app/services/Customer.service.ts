import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  endPointApi="https://localhost:44383/api/Customer";
  constructor(private http:HttpClient) { }
    //תקציר
    ///////////
    //הוספת לקוח
    //JWTקבלת לקוח על פי
    //קבלת לקוח על פי מזהה מוגבל למנהל
    //קבלת כל הלקוחותת מוגבל למנהל
    //JWTעדכון לקוח מה
    //JWTמחיקת לקוח מה
    //והוספה לטבלת סוחריםJWT מחיקת לקוח מה

      //הוספת לקוח
      async AddCustomer(obj:Customer)
      {
        return this.http.post(this.endPointApi+"/AddCustomer",obj).toPromise<any>();
      };

      //JWTקבלת לקוח על פי
      async GetCustomerbyJWT(header:any)
      {
        return this.http.get(this.endPointApi+"/GetCustomerByJWT", {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      };

        //קבלת לקוח על פי מזהה מוגבל למנהל
       async GetCustomerByIdForAdmin(id:number,header:any)
        {
          return this.http.get(this.endPointApi+"/GetCustomerByIdForAdmin/"+id, {
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };

      //קבלת כל הלקוחותת מוגבל למנהל
      async GetAllCustomersForAdmin(header:any)
      {
        return this.http.get(this.endPointApi+"/GetAllCustomersForAdmin", {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      };

     //JWTעדכון לקוח מה
      async UpdateCustomer(obj:Customer,header:any)
      {
      return this.http.put(this.endPointApi+"/UpdateCustomer",obj, {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
      };

      //JWTמחיקת לקוח מה
      async DeleteCustomer (header:any)
      {
        return this.http.delete(this.endPointApi+"/DeleteCustomer", {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      };


      // והוספה לטבלת סוחריםJWT מחיקת לקוח מה
      async  DeleteCustomerToAddMerchantByJwt(header:any)
      {
        return this.http.delete(this.endPointApi+"/DeleteCustomerToAddMerchantByJwt", {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
      };
}
