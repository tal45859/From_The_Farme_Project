import { FavoriteService } from 'src/app/services/Favorite.service';
import { ProductService } from './../../../services/Product.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { Post } from 'src/app/model/Post';
import { LoginService } from './../../../services/Login.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/model/Image';
import { ImageService } from 'src/app/services/Image.service';
import { Favorite } from 'src/app/model/Favorite';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
@Output() public UpdateArrForHome = new EventEmitter<number>();
@Output() public UpdateArrForPosts = new EventEmitter<number>();
@Output() public UpdateFavoriteToDeletePost = new EventEmitter<number>();
@Output() public UpdateAddFavorite = new EventEmitter<number>();
@Input() public HomeOrPosts:number;//Home=1/posts=2/FavoriterArr=3
@Input() public AllPostArr:Array<Post>;
public FavoriteArr:Array<Favorite>=[];
public PostImageArr:Array<Image>=[];
public PostObj:Post={};
public Role="";
public Token="";
public page = 1;//page
public NumOfStage=1;
public OpenAlert:number;
public Message:ResponseMessage={};
@Output() public ReastAllPostPlease = new EventEmitter();

 constructor(private httpFavorite:FavoriteService, private httpImage:ImageService,private httpLogin:LoginService ,private httpMechant:MerchantService ,private httpProduct:ProductService) { }

  async ngOnInit(): Promise<void> {
    this.Token=this.httpLogin.ShareData;
    this.Role=this.httpLogin.ShareRole;
    if(this.Role=="Customer")
    {
      await this.OnGetAllFavorite();
    }
    await this.OnGetAllImages();
  }

  //קבלת השלב מהבנים
   GetStage(stage:number)
  {
    this.NumOfStage=stage;
  }

  //קבלת כל התמונות
  async OnGetAllImages()
  {
      this.PostImageArr = await this.httpImage.GetAllImages();
  }

  //הוספה למערך תמונות בודדות של כל מודעה
  public singleImage(id:number)
  {
    for(let i=0;i<this.PostImageArr.length;i++)
    {
      if(this.PostImageArr[i].PostId==id)
      {
       return this.PostImageArr[i].Img.toString();
      }
    }
    return "assets\\default.jpg";
  }

  //מעבר לקומפוננטת פרטים נוספים
  async OnClickOpenPostDetails(obj:Post)
  {
    this.PostObj=obj;
    this.PostObj.Merchant = await this.httpMechant.GetMerchantById(this.PostObj.MerchantId);
    this.NumOfStage=2;
  }

  //מעבר לקומפוננטת עדכון מודעה
  public OnClickUpdate(obj:Post)
  {
    this.PostObj=obj;
    this.PostObj.Merchant=null;
    this.NumOfStage=3;
  }

    //מחיקה לסוחר
      async onclickDeleteForMerchant(id:number,postid:number)
      {
        try
        {
          await this.httpProduct.DeleteProductForMerchant(id,postid,this.Token);
          this.UpdateArrForPosts.emit(1);
        }
        catch
        {
          this.Message.Isok=false;
          this.Message.Message="לא הצלחנו למחוק מודעה זו";
          this.OpenAlert=1;
        }

      }

         //מחיקת מודעה למנהל
      async onclickDeleteForAdmin(id:number,postid:number)
      {
        try
        {
          await this.httpProduct.DeleteProductForAdmin(id,postid,this.Token);
          this.UpdateArrForHome.emit(1);
        }
        catch
        {
          this.Message.Isok=false;
          this.Message.Message="לא הצלחנו למחוק מודעה זו";
          this.OpenAlert=1;
        }
      }

      //בקשה לקומפוננטת האבא שימחק את המועדף
      public onclickDeleteFavorite(postId:number)
      {
        this.UpdateFavoriteToDeletePost.emit(postId);
      }

       //קבלת כל המועדפים
      async OnGetAllFavorite()
      {
        this.FavoriteArr =  await this.httpFavorite.GetAllFavoriteByJWT(this.Token);
      }

      //בקשה להוספת מועדף לטבלת מועדפים
    async OnCLiclAddFavorite(postId:number)
    {
      for(let i=0;i<this.FavoriteArr.length;i++)
      {
        if(this.FavoriteArr[i].PostId==postId)
        {
          this.Message.Isok=false;
          this.Message.Message="המודעה נמצאת במועדפים";
          this.OpenAlert=1;
          return;
        }
      }
      try
      {
        await this.httpFavorite.AddFavorite(postId,this.Token);
        await this.OnGetAllFavorite();
        this.UpdateAddFavorite.emit(postId)
        this.Message.Isok=true;
        this.Message.Message="המודעה הוספה בהצלחה";
        this.OpenAlert=1;
      }
      catch
      {
        this.Message.Isok=false;
        this.Message.Message="לא הצלחנו להוסיף את המודעה למועדפים";
        this.OpenAlert=1;
      }
    }

    //מפה החלק לבן חיפוש מודעה postSearch
    RestAllPost()
    {
      this.ReastAllPostPlease.emit();
    }

    ReastPage(num:number)
    {
      this.page=num;
    }

    changeAllPostArrAfterSearch(arr:Array<Post>)
    {
      this.AllPostArr = arr;
    }

    ChangeOpenAlert(isok:boolean)
    {
      this.Message={};
      this.OpenAlert=0;
    }

}


