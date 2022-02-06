import { Post } from './../../../model/Post';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Image } from 'src/app/model/Image';
import { ImageService } from 'src/app/services/Image.service';
import { Merchant } from 'src/app/model/Merchant';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
@Output() public NumOfStage = new EventEmitter<number>();
@Input() public PostObj:Post={};
public PostImageArr:Array<Image>=[];
public IdImage=0;
  constructor(private httpImage:ImageService) { }

  async ngOnInit(): Promise<void> {
    await this.GetAllImageByPostId();
  }


  async GetAllImageByPostId()
  {
    this.PostImageArr = await this.httpImage.GetImagesByPostId(this.PostObj.Id);
    if(this.PostImageArr.length==0)
    {
      let img:Image={};
      img.Img="assets\\default.jpg",
      this.PostImageArr.push(img);
    }
  }

  public OnFront()
  {
    if(this.IdImage<this.PostImageArr.length-1)
      {
        this.IdImage++;
      }
      else
      {
        this.IdImage=0;
      }
  }
  public OnBack()
  {
    if(this.IdImage>0)
      {
        this.IdImage--;
      }
      else
      {
        this.IdImage=this.PostImageArr.length-1;;
      }
  }

  public OnClickBack()
  {
    this.NumOfStage.emit(1);
  }

}
