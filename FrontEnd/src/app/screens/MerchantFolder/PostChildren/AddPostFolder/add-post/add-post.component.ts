import { ProductService } from '../../../../../services/Product.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { Product } from 'src/app/model/Product';
import { PostService } from 'src/app/services/Post.service';
import { PostValidationService } from 'src/app/services/PostValidation.service';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
@Output() public NumOfStage = new EventEmitter<number>();
@Output() public LastPostId = new EventEmitter<number>();
@Input() public Token:string;
@Input() public ProductObj:Product;
public OpenAlert:number;
public Response:ResponseMessage={Isok:true,Message:''};
public MessageAlert:ResponseMessage={};
 public  options =[
  {
    value: 1,
    name : "ירקות"
  },
  {
    value: 2,
    name : "פירות"
  }
]

   //product
   public LastProduct:Product={};
   /////
  //post
  public AddPost:Post={};
  public LastPost:Post={};
  constructor(private httpValidationPost:PostValidationService ,private httpProduct:ProductService,private httpPost:PostService ) { }

  ngOnInit(): void {
  }
  //ליצור את המודעה עם קישור לסוחר וקישור למוצר
  async OnAddPost()
  {
    this.Response = await this.httpValidationPost.CheckPostCategory(this.AddPost.CategoryId);
    if(!this.Response.Isok)
    {
      return;
    }
    await this.httpProduct.addProduct(this.ProductObj,this.Token);//הוספת המוצר
    await this.OnGetLastProduct();//המוצר האחרון של הוסחר
    this.AddPost.ProductId=this.LastProduct.Id;//לקשר לסוחר
    try{
      await this.httpPost.addPost(this.AddPost,this.Token);
      await this.LastPostByMerchant();
      this.LastPostId.emit(this.LastPost.Id);
      this.NumOfStage.emit(3);
    }
    catch{
      this.MessageAlert.Isok=false;
      this.MessageAlert.Message="לא הצלחנו לשמור את המודעה";
      this.OpenAlert=1;
    }
  }
    //לשמור את המודעה האחרונה שהסוחר העלה
    async LastPostByMerchant()
    {
      this.LastPost=await this.httpPost.GetLastPostByJWT(this.Token);
    }

    //לחפש את המוצר האחרון שאותו משתמש העלה
    async OnGetLastProduct()
    {
      this.LastProduct = await this.httpProduct.GetLastProdctMerchant(this.Token);
    }

    ChangeOpenAlert(isok:boolean)
    {
      this.MessageAlert={};
      this.OpenAlert=0;
    }
}
