import { Post } from './../model/Post';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchPostService {

constructor() { }

  //תקציר
  /////////////////////
  //מהמחיר הגבוה לנמוך
  //מהמחיר הנמוך לגבוה
  //לפי מקום מגוריך
  //משלוח

  //מהמחיר הגבוה לנמוך
  public CheckPriceMaxToMin(postArr:Array<Post>):Array<Post>
  {
      for(let i=0;i<postArr.length;i++)
      {
        for(let x=i;x<postArr.length;x++)
        {
          if(postArr[i].Product.UnitPrice < postArr[x].Product.UnitPrice)
          {
            let temp= postArr[i];
            postArr[i]= postArr[x];
            postArr[x]=temp;
          }
        }
      }
      return postArr;
  }

  //מהמחיר הנמוך לגבוה
  public CheckPriceMinToMax(postArr:Array<Post>):Array<Post>
  {
      for(let i=0;i<postArr.length;i++)
      {
        for(let x=i;x<postArr.length;x++)
        {
          if(postArr[i].Product.UnitPrice > postArr[x].Product.UnitPrice)
          {
            let temp=postArr[i];
            postArr[i]=postArr[x];
            postArr[x]=temp;
          }
        }
      }
      return postArr;
  }

  //לפי מקום מגוריך
  public CheckCity(postArr:Array<Post>,City:string):Array<Post>
  {
    let temp:Array<Post>=[];
    for(let i=0;i<postArr.length;i++)
    {
      if(postArr[i].Merchant.City == City)
      {
        temp.push(postArr[i]);
      }
    }
    return temp;
  }

  //משלוח
  public CheckSheep(postArr:Array<Post>):(Array<Post>)
  {
    let temp:Array<Post>=[];
      for(let i=0;i<postArr.length;i++)
      {
          if(postArr[i].IsShip)
          {
            temp.push(postArr[i])
          }
      }
      return temp;
  }
}
