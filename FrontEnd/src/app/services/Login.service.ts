import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endPointApi="https://localhost:44383/api/User/auth";
  constructor(private http:HttpClient) { }

  //תקציר
  ////////
  //קבלת תוקן התחברות
  //שמירת מפתח הצפנה
  //שמירת הרול
  //שמירת העיר לסוחרים ולקוחות

  //קבלת תוקן התחברות
  async GetAtuh(auth:Login)
  {
  return this.http.post(this.endPointApi,auth,{responseType: 'text' }).toPromise<any>();
  }


  //שמירת מפתח הצפנה
  get ShareData():string
  {
    return window.sessionStorage.getItem("Data");
  }
  set ShareData(val:string)
  {
    window.sessionStorage.setItem("Data",val);
  }

  //שמירת הרול
  get ShareRole():string
  {
    return window.sessionStorage.getItem("Role");
  }
  set ShareRole(val:string)
  {
    window.sessionStorage.setItem("Role",val);
  }


    //שמירת העיר לסוחרים ולקוחות
    get ShareCity():string
    {
      return window.sessionStorage.getItem("City");
    }
    set ShareCity(val:string)
    {
      window.sessionStorage.setItem("City",val);
    }

}
