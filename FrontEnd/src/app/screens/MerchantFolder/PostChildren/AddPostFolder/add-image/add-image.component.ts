import { ImageValidationService } from './../../../../../services/ImageValidation.service';
import { PostValidationService } from 'src/app/services/PostValidation.service';
import { Component, Input, OnInit} from '@angular/core';
import { Image } from 'src/app/model/Image';
import { ResponseMessage } from 'src/app/model/ResponseMessage';
import { ImageService } from 'src/app/services/Image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
@Input() public LastPostId:number;
@Input() public Token:string;
public OpenAlert:number;
public MessageAlert:ResponseMessage={};
public Response:ResponseMessage={Isok:true, Message:''};
public  formData = new FormData();
public AllNewImageArr:Array<Image>=[];
public CounterLengthImages=0;
  constructor(private httpImage:ImageService,private ValidationImage:ImageValidationService) { }

  ngOnInit(): void {
  }

  async OnGetAllImageArray(postid:number)
  {
  this.AllNewImageArr = await this.httpImage.GetImagesByPostId(postid);
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    if(this.CounterLengthImages==3)
    {
      this.Response.Isok=false;
      this.Response.Message="ניתן לעלות 3 תמונות בלבד";
      return;
    }
    let fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, this.LastPostId.toString()+fileToUpload.name);

    this.Response = this.ValidationImage.CheckImage(fileToUpload.name);
    if(!this.Response.Isok)
    {
      return
    }
     this.OnClickAddImageNew(this.LastPostId.toString()+fileToUpload.name);
  }

  async OnClickAddImageNew(filename:string)
  {
    try{
      let objAddImageForDb:Image={};
      objAddImageForDb.Img=filename;
      objAddImageForDb.PostId=this.LastPostId;
      await this.httpImage.AddOnleyImageNew(this.formData,this.Token);
      await this.httpImage.AddImage(objAddImageForDb,this.Token);
      this.CounterLengthImages++;
      await this.OnGetAllImageArray(this.LastPostId);
    }
    catch
    {

      this.MessageAlert.Isok=false;
      this.MessageAlert.Message="לא הצלחנו לעלות את התמונה אנא נסה שוב מאוחר יותר!";
      this.OpenAlert=1;
    }

  }

  async OnclickDeleteImage(id:number)
  {
    try{
      await this.httpImage.deleteImage(id,this.Token);
      await this.OnGetAllImageArray(this.LastPostId);
      this.CounterLengthImages--;
    }
    catch
    {
      this.MessageAlert.Isok=false;
      this.MessageAlert.Message="לא הצלחנו למחוק את התמונה אנא נסה שוב מאוחר יותר!";
      this.OpenAlert=1;
      return;
    }
  }

  public OnClickFinish()
  {
    this.MessageAlert.Isok=true;
    this.MessageAlert.Message="המודעה הועלתה בהצלחה";
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

