import { Post } from './../model/Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorite } from '../model/Favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  endPointApi="https://localhost:44383/api/Favorite";
constructor(private http:HttpClient) { }
        //תקציר
        //JWT הוספת מועדף על פי
        //JWT קבלת רשימת מעודפים על פי
        //JWTמחיקת מעודף על פי מזהה לקוח ו

        //JWT הוספת מועדף על פי
        async AddFavorite(postid:number,header:any)
        {
          return this.http.post(this.endPointApi+"/AddFavorite",postid,{
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };

        //JWT קבלת רשימת מעודפים על פי
        async GetAllFavoriteByJWT(header:any)
        {
          return this.http.get(this.endPointApi+"/GetAllFavoriteByJWT",{
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };

        //JWTמחיקת מעודף על פי מזהה לקוח ו
        async DeleteFavorite(id:number,header:any)
        {
          return this.http.delete(this.endPointApi+"/DeleteFavorite/"+id,{
            headers: new HttpHeaders().set('Authorization', header),
          }).toPromise<any>();
        };
}
