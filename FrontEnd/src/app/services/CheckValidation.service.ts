import { ResponseMessage } from './../model/ResponseMessage';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CheckValidationService  {

constructor() { }


  //תקציר
  ////////
  //בדיקת תקינות סיסמה
  //בדיקת תקינות מייל
  //בדיקת תקינות טלפון
  //בדיקת תקינות שם פרטי
  //בדיקת תקינות שם משפחה
  //בדיקת תקינות תאריך לידה
  //בדיקת תקינות רול
  //בדיקת תקינות עיר
  //בדיקת תקינות מדיניות הפרטיות

  //בדיקת תקינות סיסמה
 public ChaeckPassword(Password:string):ResponseMessage
 {
   let MessageObj:ResponseMessage={};
   if(Password == null || Password.length == 0)
   {
    MessageObj.Isok=false;
    MessageObj.Message="אנא הזן סיסמה!";
    return MessageObj;
   }
   else if(Password.length < 8)
   {
    MessageObj.Isok=false;
    MessageObj.Message="סיסמה חייבת להיות בין 8-16 תווים!";
    return MessageObj;
   }
   else if(!/.*[a-z].*/.test(Password)|| !/.*[A-Z].*/.test(Password)||
          !/.*[0-9].*/.test(Password) || !/[^a-zA-Z0-9 ]/.test(Password))
   {
    MessageObj.Isok=false;
    MessageObj.Message="סיסמה חייבת להכיל אותיות גדולות וקטנות באנגלית מספרים סימנים או אותיות בעברית ללא רווחים!";
    return MessageObj;
   }
   MessageObj.Isok=true;
  return MessageObj;
}

  //בדיקת תקינות מייל
 public CheckEmail(Email:string):ResponseMessage
 {
  let MessageObj:ResponseMessage={};
   if(Email == null || Email.length==0)
   {
    MessageObj.Isok=false;
    MessageObj.Message="אנא הזן מייל!";
    return MessageObj;
   }
   else if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email))
   {
    MessageObj.Isok=true;
     return MessageObj;
   }
   MessageObj.Isok=false;
   MessageObj.Message="אנא הזן מייל תקין!";
   return MessageObj;
 }

 //בדיקת תקינות טלפון
 public CheckPhone(Phone:string):ResponseMessage
    {
      let MessageObj:ResponseMessage={};
      if(Phone == null || Phone.length == 0)
      {
        MessageObj.Isok=false;
        MessageObj.Message="אנא הזן מספר טלפון!";
        return MessageObj;
      }
      else if(/[^0-9]/.test(Phone))
      {
        MessageObj.Isok=false;
        MessageObj.Message="מספר טלפון חייב להכיל מספרים בלבד!";
        return MessageObj;
      }
      MessageObj.Isok=true;
      return MessageObj;
    }

   //בדיקת תקינות שם פרטי
   public CheckFirstName(FirstName:string):ResponseMessage
   {
    let MessageObj:ResponseMessage={};
    if(FirstName==null ||FirstName.length==0)
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן שם פרטי!";
      return MessageObj;
    }
    else if(/[^א-תa-zA-Z ]/.test(FirstName))
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן תווים בעברית או באנגלית בלבד ללא סימנים או מספרים!";
      return MessageObj;
    }
    MessageObj.Isok=true;
    return MessageObj;
   }

   //בדיקת תקינות שם משפחה
   public CheckLastName(LastName:string):ResponseMessage
   {
    let MessageObj:ResponseMessage={};
    if(LastName==null ||LastName.length==0)
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן שם משפחה!";
      return MessageObj;
    }
    else if(/[^א-תa-zA-Z ]/.test(LastName))
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן תווים בעברית או באנגלית בלבד ללא סימנים או מספרים!";
      return MessageObj;
    }
    MessageObj.Isok=true;
    return MessageObj;
   }

  //בדיקת תקינות תאריך לידה
  public CheckBirthdate(Birthdate:Date):ResponseMessage
  {
    let MessageObj:ResponseMessage={};
    if(Birthdate == null)
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן תאריך לידה!";
      return MessageObj;
    }
    MessageObj.Isok=true;
    return MessageObj;
  }

  //בדיקת תקינות רול
  public CheckRole(Role:string):ResponseMessage
  {
    let MessageObj:ResponseMessage={};
    if(Role==null || Role.length==0)
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן סוג משתמש!";
      return MessageObj;
    }
    else if(Role!="Customer" &&Role !="Admin" && Role!="Merchant")
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן סוג משתמש!";
      return MessageObj;
    }
    MessageObj.Isok=true;
    return MessageObj;
  }


  //בדיקת תקינות עיר
  public CheckCity(City:string):ResponseMessage
  {
    let MessageObj:ResponseMessage={};
    if(City== null|| City.length==0)
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן עיר!";
      return MessageObj;
    }
    else if(/[^א-תa-zA-Z ]/.test(City))
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן אותיות בעברית או באנגלית בלבד ללא סימנים ומספרים!";
      return MessageObj;
    }
    MessageObj.Isok=true;
    return MessageObj;
  }

  //בדיקת תקינות מדיניות הפרטיות
  public CheckPolicy(Policy:boolean):ResponseMessage
  {
    let MessageObj:ResponseMessage={};
    if(!Policy)
    {
      MessageObj.Isok=false;
      MessageObj.Message="חובה להסכים למדיניות הפרטיות!";
      return MessageObj;
    }
    MessageObj.Isok=true;
    return MessageObj;
  }

}


