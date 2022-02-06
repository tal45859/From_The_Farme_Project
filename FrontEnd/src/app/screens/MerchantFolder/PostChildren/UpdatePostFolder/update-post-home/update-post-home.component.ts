import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/Post';

@Component({
  selector: 'app-update-post-home',
  templateUrl: './update-post-home.component.html',
  styleUrls: ['./update-post-home.component.css']
})
export class UpdatePostHomeComponent implements OnInit {
  @Input() public UpdatePost:Post;
  @Input() public Token:string;
  public NumOfStage=1;
  constructor() { }
  ngOnInit(): void {
  }
    //בשביל לדעת את מי להפעיל בכל רגע נתון
    GetStage(Stage: number)
    {
        this.NumOfStage=Stage;
    }

    //בשביל לשלוח לאחרים את האוביקט שאותו מעדכנים
    GetUpdatePost(PostObj: Post)
    {
        this.UpdatePost=PostObj;
    }

}
