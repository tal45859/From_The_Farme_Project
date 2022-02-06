import { Injectable } from '@angular/core';
import { ResponseMessage } from '../model/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class ProductValidationService {

constructor() { }
   //תקציר
   ///////
   //בדיקת שם מוצר
   //בדיקת מחיר לקג מוצר
   //בדיקת כמות במלאי מוצר
   //בדיקת פרטים נוספים מוצר


  //בדיקת שם מוצר
  public CheckProductName(Name:string):ResponseMessage
  {
   let MessageObj:ResponseMessage={};
   if(Name==null ||Name.length==0)
   {
     MessageObj.Isok=false;
     MessageObj.Message="אנא הזן שם מוצר!";
     return MessageObj;
   }
   else if(/[^א-תa-zA-Z ]/.test(Name))
   {
     MessageObj.Isok=false;
     MessageObj.Message="אנא הזן תווים בעברית או באנגלית בלבד ללא סימנים או מספרים!";
     return MessageObj;
   }
   MessageObj.Isok=true;
   return MessageObj;
  }

  //בדיקת מחיר לקג מוצר
  public CheckProductUnitPrice(UnitPrice:number):ResponseMessage
  {
    let MessageObj:ResponseMessage={};
    if(UnitPrice == null || UnitPrice == 0)
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן מחיר לקג!";
      return MessageObj;
    }
    else if(/[^0-9]/.test(UnitPrice.toString()))
    {
      MessageObj.Isok=false;
      MessageObj.Message="מחיר לקג חייב להכיל מספרים בלבד!";
      return MessageObj;
    }
    MessageObj.Isok=true;
    return MessageObj;
  }

    //בדיקת כמות במלאי מוצר
    public CheckProductUnitInStock(UnitInStock:number):ResponseMessage
    {
      let MessageObj:ResponseMessage={};
      if(UnitInStock == null || UnitInStock == 0)
      {
        MessageObj.Isok=false;
        MessageObj.Message="אנא הזן כמות במלאי!";
        return MessageObj;
      }
      else if(/[^0-9]/.test(UnitInStock.toString()))
      {
        MessageObj.Isok=false;
        MessageObj.Message="כמות במלאי חייב להכיל מספרים בלבד!";
        return MessageObj;
      }
      MessageObj.Isok=true;
      return MessageObj;
    }

    //בדיקת פרטים נוספים מוצר
    public CheckProductMoreInfo(MoreInfo:string):ResponseMessage
    {
      let MessageObj:ResponseMessage={};
      if(MoreInfo == "" || MoreInfo==null || MoreInfo.length==0)
      {
        MessageObj.Message = "אנא הזן פרטים נוספים!";
        MessageObj.Isok = false;
        return MessageObj;
      }
      MessageObj.Isok = true;;
      return MessageObj;
    }
}
