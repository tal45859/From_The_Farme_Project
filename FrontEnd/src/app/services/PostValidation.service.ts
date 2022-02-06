import { Injectable } from '@angular/core';
import { ResponseMessage } from '../model/ResponseMessage';


@Injectable({
  providedIn: 'root'
})
export class PostValidationService {
constructor() { }

  //תקציר
  ///////
  //בדיקת קטגוריה

  //בדיקת קטגוריה
  public CheckPostCategory(CategoryId:number):ResponseMessage
  {
    let MessageObj:ResponseMessage={};
    if(CategoryId==null)
    {
      MessageObj.Message="אנא בחר קטגוריה!";
      MessageObj.Isok=false;
      return MessageObj;
    }
    MessageObj.Isok=true;
    return MessageObj;
  }
}
