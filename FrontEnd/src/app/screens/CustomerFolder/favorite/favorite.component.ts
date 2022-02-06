import {Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/model/Favorite';
import { FavoriteService } from 'src/app/services/Favorite.service';
import { LoginService } from 'src/app/services/Login.service';
import { Post } from 'src/app/model/Post';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
///Favorite
public FavoriteArr:Array<Favorite>=[];
//Post
public PostArr:Array<Post>=[];
  private Token:string;
  public OpenAlert:number;
  public Message:ResponseMessage={};
  constructor(private httpLogin: LoginService,private httpFavorite:FavoriteService) { }
  async ngOnInit(): Promise<void> {
    this.Token=this.httpLogin.ShareData;
    await this.OnGetAllFavorite();
  }

  async OnGetAllFavorite()
  {
    this.FavoriteArr =  await this.httpFavorite.GetAllFavoriteByJWT(this.Token);
    this.PostArr=[];
    for(let i=0;i<this.FavoriteArr.length;i++)
    {
      this.PostArr.push(this.FavoriteArr[i].Post);
    }
  }

  ///מחיקה מהבן
  async DeleteFavoriteByPostId(postid:number)
  {
    for(let i=0;i<this.FavoriteArr.length;i++)
    {
      if(this.FavoriteArr[i].PostId==postid)
      {
        try
        {
          await this.httpFavorite.DeleteFavorite(this.FavoriteArr[i].Id,this.Token);
          this.Message.Isok=true;
          this.Message.Message="המודעה נמחקה בהצלחה מהמועדפים";
          this.OpenAlert=1;
          await this.OnGetAllFavorite();
          return;
        }
        catch
        {
          this.Message.Isok=false;
          this.Message.Message="לא הצלחנו למחוק את המודעה מהמועדפים";
          this.OpenAlert=1;
          return;
        }
      }
    }
  }

  ChangeOpenAlert(isok:boolean)
  {
    this.Message={};
    this.OpenAlert=0;
  }
}
