import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-add-post-home',
  templateUrl: './add-post-home.component.html',
  styleUrls: ['./add-post-home.component.css']
})
export class AddPostHomeComponent implements OnInit {
@Input() public Token:string;
public AddProductObj:Product;
public LastPostId:number;
public NumOfStage=1;

  constructor() { }
  ngOnInit(): void {
  }


  //בשביל לדעת את מי להפעיל בכל רגע נתון
  GetStage(Stage: number)
  {
      this.NumOfStage=Stage;
  }

  //בשביל הוספת מוצר בקומפוננטת הוספת מודעה
  GetProduct(product:Product)
  {
    this.AddProductObj=product;
  }

  //בשביל הוספת תמונה בקומפוננטת הוספת תמונה
  GetLastPostId(id:number)
  {
    this.LastPostId=id;
  }


}
