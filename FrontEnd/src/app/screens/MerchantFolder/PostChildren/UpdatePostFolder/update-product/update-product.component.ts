import { ProductValidationService } from './../../../../../services/ProductValidation.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { ResponseMessage } from 'src/app/model/ResponseMessage';
import { PostValidationService } from 'src/app/services/PostValidation.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  @Output() public NumOfStage = new EventEmitter<number>();
  @Output() public UpdatePostObj = new EventEmitter<Post>();
  @Input() public UpdatePost:Post;
  public Response:Array<ResponseMessage>=[
    {Isok:true ,Message:''},
    {Isok:true ,Message:''},
    {Isok:true ,Message:''},
    {Isok:true ,Message:''}
  ];
  constructor(private httpValidationProduct:ProductValidationService) { }

  ngOnInit(): void {
  }

  async OnClickNext()
  {
    this.Response[0] = await this.httpValidationProduct.CheckProductName(this.UpdatePost.Product.ProductName);
    this.Response[1] = await this.httpValidationProduct.CheckProductUnitPrice(this.UpdatePost.Product.UnitPrice);
    this.Response[2] = await this.httpValidationProduct.CheckProductUnitInStock(this.UpdatePost.Product.UnitInStock);
    this.Response[3] = await this.httpValidationProduct.CheckProductMoreInfo(this.UpdatePost.Product.MoreInfo);
    if(!this.Response[0].Isok || !this.Response[1].Isok ||
     !this.Response[2].Isok || !this.Response[3].Isok )
     {
       return;
     }
    this.UpdatePostObj.emit(this.UpdatePost);
    this.NumOfStage.emit(2);//לעבור לשלב הבא
 }
}
