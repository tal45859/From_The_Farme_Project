import { Component, Input, OnInit} from '@angular/core';
import { Post } from 'src/app/model/Post';
import { PostService } from 'src/app/services/Post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
//post
public postArr:Array<Post>=[];
  constructor(private httpPost:PostService ) { }

  async ngOnInit(): Promise<void>
  {
    await this.OnGetAllPosts();
  }
  //לעדכן בשביל הילד
  async ChangeUpdateArrForPosts(num:number)
  {
    await this.OnGetAllPosts();
  }

  //ge all post
  async OnGetAllPosts()
  {
    this.postArr= await this.httpPost.GetAllPosts();
  }

}
