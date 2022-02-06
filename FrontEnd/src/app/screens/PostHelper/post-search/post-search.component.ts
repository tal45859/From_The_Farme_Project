import { ResponseMessage } from './../../../model/ResponseMessage';
import { async } from '@angular/core/testing';
import { LoginService } from './../../../services/Login.service';
import { SearchPostService } from './../../../services/SearchPost.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/model/Post';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
@Output() public UpdatePostArr = new EventEmitter<Array<Post>>();
@Output() public AllPostAfterSearch = new EventEmitter<number>();
@Output() public Page = new EventEmitter<number>();
@Input() public AllPostArr:Array<Post>;
@Output() public HomeOrPosts = new EventEmitter<number>();//Home=1/posts=2/FavoriterArr=3
public PostSearch:Array<Post>;
//placeholder
public PlaceHolderRslult="שם המוצר";
//
//search
public FindProduct="";
////
public Message:ResponseMessage={};
public OpenAlert:number;

//מסננים
public ResultToOption:number;
public options =[
  {
    value: 1,
    name : "מחיר מהגבוה לנמוך"
  },
  {
    value: 2,
    name : "מחיר מהנמוך לגבוה"
  },
  {
    value: 3,
    name : "לפי מקום מגוריך"
  },
  {
    value: 4,
    name : "משלוח"
  },
  {
    value: 5,
    name : "ללא מסנן"
  }
]
public options2 =[
  {
    value: 1,
    name : "מחיר מהגבוה לנמוך"
  },
  {
    value: 2,
    name : "מחיר מהנמוך לגבוה"
  },
  {
    value: 4,
    name : "משלוח"
  },
  {
    value: 5,
    name : "ללא מסנן"
  }
]
public City="";
  constructor(private httpSearchPost:SearchPostService,private httpLogin:LoginService) { }

  ngOnInit(): void {
     this.City = this.httpLogin.ShareCity;
  }
  //חיפוש
  public GetPostByProductName()
  {
    if(this.FindProduct=="")
    {
      this.PlaceHolderRslult="עליך להזין ערך";
      window.document.getElementById("inputreslt").classList.add('ErrorInput');
      return;
    }
    this.PostSearch=[];

    for(let k=0;k<this.AllPostArr.length;k++)
    {
      let counter=0;
      for(let i=0;i<Math.min(this.FindProduct.length,2);i++)
      {
          if(this.AllPostArr[k].Product.ProductName.match(this.FindProduct[i]))
          {
            counter++;
          }
          if(counter==2)
          {
            this.PostSearch.push(this.AllPostArr[k]);
          }
      }
    }
    this.AllPostArr = this.PostSearch;
    if(this.AllPostArr.length==0)
    {
      this.Message.Isok=false;
      this.Message.Message="לא נמצא תוצאה";
      this.OpenAlert=1;
      this.HomeOrPosts.emit();
      return;
    }
    this.UpdatePostArr.emit(this.AllPostArr);
    this.Page.emit(1);
}
  //איתחול של המערך והפלאסולדר
  public OnClickChangeToStartPlaceholder()
  {
    this.HomeOrPosts.emit();
    this.Page.emit(1);//אפשר לשנות פשוט שיש הרבה תוצאות ועושים ריפרוש עוברים למספר דף בכללי
    this.FindProduct="";
    this.PostSearch=[];
    this.ResultToOption=0;
    this.PlaceHolderRslult="שם המוצר";
    window.document.getElementById("inputreslt").classList.remove('ErrorInput');
  }

  //סינון תוצאות חיפוש
  async FilterSearchResults(id:number)
  {
    if(id==1)
    {
      this.AllPostArr = await this.httpSearchPost.CheckPriceMaxToMin(this.AllPostArr);
    }
    else if(id==2)
    {
      //מחיר מהנמוך לגבווה
      this.AllPostArr = this.httpSearchPost.CheckPriceMinToMax(this.AllPostArr);
    }
    else if(id==3)
    {
      //עיר
      this.AllPostArr = this.httpSearchPost.CheckCity(this.AllPostArr,this.City);
    }
    else if(id==4)
    {
      //משלוח
      this.AllPostArr = this.httpSearchPost.CheckSheep(this.AllPostArr);
    }
    else if(id==5)
    {
       //ללא מסנן
        if(this.FindProduct!='' && this.PostSearch.length!=0)
        {

          this.AllPostArr=this.PostSearch;
          await this.GetPostByProductName();
        }
        else
        {
          this.HomeOrPosts.emit();
        }
    }
    if(this.AllPostArr.length==0)
    {
      //אם אין תוצאות לאחר הבדיקות
     // alert("לא נמצא תוצאה");
      this.Message.Isok=false;
      this.Message.Message="לא נמצא תוצאה";
      this.OpenAlert=1;
     this.HomeOrPosts.emit();
     this.Page.emit(1);
    }
    this.UpdatePostArr.emit(this.AllPostArr);//מחזיר לאבא את המערך החדש
   this.Page.emit(1);

  }
  ChangeOpenAlert(isok:boolean)
  {
    this.Message={};
    this.OpenAlert=0;
    
  }

}
