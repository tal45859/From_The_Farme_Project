import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endPointApi="https://localhost:44383/api/User";
  constructor(private http:HttpClient) { }




        // תקציר
        /////////
        // קבלת משתמש על פי מייל
        // קבלת רשימת משתמשים
        // קבלת משתמש על פי מזהה
        //קבלת משתמש על פי JWT
        //קבלת רשימת משתמשים שהם לא מנהלים מוגבל למנהל
        // הוספת משתמש
        //עדכון רול למשתמש מוגבל למנהל
        //עדכון משתמש
        //מחיקת משתמש לאדמין
        //מחיקת משתמש
        //שכחתי סיסמה
        //בדיקה האם קיים המייל


       // קבלת משתמש על פי מייל
       async GetUserByMail(email:string)
       {
         return this.http.get(this.endPointApi+"/GetUserByMail/"+email).toPromise<any>();
       };

        // קבלת רשימת משתמשים
        async GetAllUsers(header:any)
        {
          return this.http.get(this.endPointApi+"/GetAllUsers", {
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };

        // קבלת משתמש על פי מזהה
        async GetSingleUser(id:number,header:any)
        {
          return this.http.get(this.endPointApi+"/GetSingleUser/"+id, {
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };

        //קבלת משתמש על פי JWT
        async GetUserByJwt(header:any)
        {
          return this.http.get(this.endPointApi+"/GetUserByJwt", {
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };

        //קבלת רשימת משתמשים שהם לא מנהלים מוגבל למנהל
        async GetAllUsersNotAdmin(header:any)
        {
          return this.http.get(this.endPointApi+"/GetAllUsersNotAdmin", {
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };

        // הוספת משתמש
        async addUser(obj:User)
        {
          return this.http.post(this.endPointApi,obj).toPromise<any>();
        };

        //עדכון רול למשתמש מוגבל למנהל
        async UpdateUserRoleForAdmin(obj:User,header:any)
        {
        return this.http.put(this.endPointApi+"/UpdateUserRoleForAdmin/"+obj.Id,obj, {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
        };

        //עדכון משתמש
        async UpdateUser(obj:User,header:any)
        {
        return this.http.put(this.endPointApi+"/UpdateUser",obj, {
          headers: new HttpHeaders().set('Authorization', header),
        }).toPromise<any>();
        };

        //מחיקת משתמש לאדמין
        async DeleteUserForAdmin(id:number,header:any)
        {
          return this.http.delete(this.endPointApi+"/DeleteUserForAdmin/"+id, {
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };

        //מחיקת משתמש
        async DeleteUserByJWT (header:any)
        {
          return this.http.delete(this.endPointApi+"/DeleteUserByJWT", {
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };

        //שכחתי סיסמה
        async ForgotPassword(email:string)
        {
          return this.http.get(this.endPointApi+"/ForgotPassword/"+email).toPromise<any>();
        };

        //בדיקה האם קיים המייל
        async CheckEmail(Email:string)
        {
          return this.http.get(this.endPointApi+"/CheckEmail/"+Email).toPromise<any>();
        }
}
