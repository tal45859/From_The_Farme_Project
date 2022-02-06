import { ImageValidationService } from './../../../../../services/ImageValidation.service';
import { ProductService } from './../../../../../services/Product.service';
import { PostValidationService } from 'src/app/services/PostValidation.service';
import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/model/Image';
import { Post } from 'src/app/model/Post';
import { ResponseMessage } from 'src/app/model/ResponseMessage';
import { ImageService } from 'src/app/services/Image.service';
import { PostService } from 'src/app/services/Post.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {
  @Input() public UpdatePost:Post;
  @Input() public Token:string;
  public UpdateImage:Array<Image>=[];
  public LenghtForAddImage=0;
  public  formData = new FormData();
  public Response:ResponseMessage={Isok:true, Message:''};
  public OpenAlert:number;
  public MessageAlert:ResponseMessage={};

  constructor(private httpImage:ImageService,private httpProduct:ProductService,private httpPost:PostService,private ValidationImage:ImageValidationService) { }

  async ngOnInit(): Promise<void> {
    await this.changeToUpdate();
  }

  async changeToUpdate()
  {
     await this.OnGetUpdateImageArray();
     this.LenghtForAddImage=3-this.UpdateImage.length;
  }

  async OnGetUpdateImageArray()
  {
   this.UpdateImage=(await this.httpImage.GetImagesByPostId(this.UpdatePost.Id));
  }

  public uploadFileInUpdate = (files) => {
    if (files.length === 0) {
      return;
    }
    if(this.LenghtForAddImage==0)
    {
      this.Response.Isok=false;
      this.Response.Message = "ניתן לעלות 3 תמונות בלבד";
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, this.UpdatePost.Id.toString()+fileToUpload.name);
    this.Response = this.ValidationImage.CheckImage(fileToUpload.name);
    if(!this.Response.Isok)
    {
      return
    }
    this.OnClickAddImageInUpdate(this.UpdatePost.Id.toString()+fileToUpload.name);
  }

  async OnClickAddImageInUpdate(filename:string)
  {
    try{
      let objAddImageForDb:Image={};
      objAddImageForDb.Img=filename;
      objAddImageForDb.PostId=this.UpdatePost.Id;
      await this.httpImage.AddOnleyImageNew(this.formData,this.Token);
      await this.httpImage.AddImage(objAddImageForDb,this.Token);
      this.LenghtForAddImage--;
      await this.OnGetUpdateImageArray();
    }
    catch
    {
      this.MessageAlert.Isok=false;
      this.MessageAlert.Message="לא הצלחנו לשמור את התמונה";
      this.OpenAlert=1;
    }
  }
  async OnclickDeleteImage(id:number)
  {
    try{
      await this.httpImage.deleteImage(id,this.Token);
      await this.OnGetUpdateImageArray();
      this.LenghtForAddImage++;
    }
    catch
    {
      this.MessageAlert.Isok=false;
      this.MessageAlert.Message="לא הצלחנו למחוק את התמונה";
      this.OpenAlert=1;
      return;
    }
  }

  async OnClickUpdate()
  {
    try{
      await this.httpProduct.updateProduct(this.UpdatePost.Product,this.Token);
    }
    catch
    {
      this.MessageAlert.Isok=false;
      this.MessageAlert.Message="לא הצלחנו לשמור את המוצר";
      this.OpenAlert=1;
      return;
    }
    try{
      await this.httpPost.UpdatePost(this.UpdatePost,this.Token);
    }
    catch
    {
      this.MessageAlert.Isok=false;
      this.MessageAlert.Message="לא הצלחנו לשמור את המודעה";
      this.OpenAlert=1;
      return;
    }
    this.MessageAlert.Isok=true;
    this.MessageAlert.Message="העדכון הצליח";
    this.OpenAlert=1;
  }

  ChangeOpenAlert(isok:boolean)
  {
    this.MessageAlert={};
    this.OpenAlert=0;
    if(isok)
    {
      window.location.reload();
    }
  }
}
