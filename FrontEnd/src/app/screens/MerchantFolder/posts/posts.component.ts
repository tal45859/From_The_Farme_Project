import { ProductService } from '../../../services/Product.service';
import { Component, EventEmitter, Input, OnInit, Output, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { Merchant } from 'src/app/model/Merchant';
import { ImageService } from 'src/app/services/Image.service';
import { LoginService } from 'src/app/services/Login.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { PostService } from 'src/app/services/Post.service';
import { Post } from 'src/app/model/Post';
import { Image } from 'src/app/model/Image';
import { Product } from 'src/app/model/Product';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  //post
  public MerchantPostArr:Array<Post>=[];
  //for Stage
  public ClickId=1;
  //security
  public Token:string;
  ///////////
  constructor(private httpLogin: LoginService,private httpPost:PostService) { }

     async ngOnInit(): Promise<void> {
     this.Token=this.httpLogin.ShareData;
     await this.OnGetAllPostsByMerchantJWT();//כל הפוסטים
  }
   //לעדכן בשביל הילד
   async ChangeUpdateArrForPosts(num:number)
   {
     await this.OnGetAllPostsByMerchantJWT();
   }

  //חדש במקום הלמעלה
  async OnGetAllPostsByMerchantJWT()
  {
    this.MerchantPostArr=await this.httpPost.GetAllPostByJWT(this.Token);
  }

  public OnClickBtn(id:number)
  {
    this.ClickId=id;
  }

}
