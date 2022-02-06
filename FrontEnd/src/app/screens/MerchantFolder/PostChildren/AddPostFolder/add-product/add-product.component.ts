import { PostValidationService } from 'src/app/services/PostValidation.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ResponseMessage } from 'src/app/model/ResponseMessage';
import { ProductValidationService } from 'src/app/services/ProductValidation.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
@Output() public NumOfStage = new EventEmitter<number>();
@Output() public AddProductObj = new EventEmitter<Product>();

public Response:Array<ResponseMessage>=[
  {Isok:true ,Message:''},
  {Isok:true ,Message:''},
  {Isok:true ,Message:''},
  {Isok:true ,Message:''}
];
  public ProductObj:Product={};
  constructor(private httpValidationProduct:ProductValidationService) { }
  ngOnInit(): void {
  }
  async OnAddProduct()
  {
     this.Response[0] = await this.httpValidationProduct.CheckProductName(this.ProductObj.ProductName);
     this.Response[1] = await this.httpValidationProduct.CheckProductUnitPrice(this.ProductObj.UnitPrice);
     this.Response[2] = await this.httpValidationProduct.CheckProductUnitInStock(this.ProductObj.UnitInStock);
     this.Response[3] = await this.httpValidationProduct.CheckProductMoreInfo(this.ProductObj.MoreInfo);
     if(!this.Response[0].Isok || !this.Response[1].Isok ||
      !this.Response[2].Isok || !this.Response[3].Isok )
      {
        return;
      }
    this.AddProductObj.emit(this.ProductObj);
    this.NumOfStage.emit(2);//לעבור לשלב הבא
 }
}
