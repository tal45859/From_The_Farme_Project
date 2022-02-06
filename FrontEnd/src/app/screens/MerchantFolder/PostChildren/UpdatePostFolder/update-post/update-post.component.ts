import { PostValidationService } from '../../../../../services/PostValidation.service';
import { ProductService } from '../../../../../services/Product.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/model/Image';
import { Post } from 'src/app/model/Post';
import { ImageService } from 'src/app/services/Image.service';
import { PostService } from 'src/app/services/Post.service';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  constructor(private httpValidationPost:PostValidationService) { }
  @Output() public NumOfStage = new EventEmitter<number>();
  @Output() public UpdatePostObj = new EventEmitter<Post>();
  @Input() public UpdatePost:Post;
  public Response:ResponseMessage={Isok:true,Message:''};
   ngOnInit(): void {
  }

  async OnClickNext()
  {
    this.Response = await this.httpValidationPost.CheckPostCategory(this.UpdatePost.CategoryId);
    if(!this.Response.Isok)
    {
      return;
    }
     this.UpdatePostObj.emit(this.UpdatePost);
     this.NumOfStage.emit(3);
  }
}
