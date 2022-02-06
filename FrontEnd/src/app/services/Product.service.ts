import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endPointApi="https://localhost:44383/api/Product";
  constructor(private http:HttpClient) { }

  //תקציר
  ///////////
  //הוספת מוצר
  //קבלת המוצר האחרון שהסוחר העלה
  //קבלת כל המוצרים
  //קבלת כל המוצרים של אותו סוחר
  //קבלת מוצר לפי מזהה מוצר
  //עדכון מוצר
  //מחיקת מוצר מוגבל לסוחר
  //מחיקת מוצר מוגבל למנהל למנהל

  //הוספת מוצר
  async addProduct(obj:Product,header:any)
  {
    return this.http.post(this.endPointApi+"/AddProduct",obj, {
      headers: new HttpHeaders().set('Authorization', header)
       }).toPromise<any>();
  };

  //קבלת המוצר האחרון שהסוחר העלה
  async GetLastProdctMerchant(header:any)
  {
    return this.http.get(this.endPointApi+"/GetLastProductForMerchant",{
      headers: new HttpHeaders().set('Authorization', header)
       }).toPromise<any>();
  };

  //קבלת כל המוצרים
  async GetAllProducts(header:any)
  {
    return this.http.get(this.endPointApi+"/GetAllProducts",{
      headers: new HttpHeaders().set('Authorization', header)
       }).toPromise<any>();
  };

  //קבלת כל המוצרים של אותו סוחר
  async GetAllProductsByMerchantId(header:any)
  {
    return this.http.get(this.endPointApi+"/GetAllProductsByMerchantId",{
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

  //קבלת מוצר לפי מזהה מוצר
  async GetProductById(id:number)
  {
    return this.http.get(this.endPointApi+"/GetProductById/"+id).toPromise<any>();
  };

  //עדכון מוצר
  async updateProduct(obj:Product,header:any)
  {
  return this.http.put(this.endPointApi+"/UpdateProduct/"+obj.Id,obj, {
    headers: new HttpHeaders().set('Authorization', header),
  }).toPromise<any>();
  };

  //מחיקת מוצר מוגבל לסוחר
  async DeleteProductForMerchant(id:number ,postid:number,header:any)
{
  return this.http.delete(this.endPointApi+"/DeleteProductForMerchant/"+id+"/"+postid, {
    headers: new HttpHeaders().set('Authorization', header),
  }).toPromise<any>();
};

//מחיקת מוצר מוגבל למנהל למנהל
async DeleteProductForAdmin(id:number,postid:number,header:any)
{
  return this.http.delete(this.endPointApi+"/DeleteProductForAdmin/"+id+"/"+postid, {
    headers: new HttpHeaders().set('Authorization', header),
  }).toPromise<any>();
};
}
