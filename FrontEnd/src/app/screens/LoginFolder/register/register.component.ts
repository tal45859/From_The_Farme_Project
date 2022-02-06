import { CustomerService } from './../../../services/Customer.service';
import { Customer } from './../../../model/Customer';
import { Merchant } from './../../../model/Merchant';
import { MerchantService } from './../../../services/merchant.service';
import { UserService } from './../../../services/User.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { CheckValidationService } from 'src/app/services/CheckValidation.service';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public Response:Array<ResponseMessage>=[
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''}
  ];

  public Type="password";
  public ShowPassword=false;

  public PlaceHoledrForogtPassword="מייל";

  public PlaceHoledr=[
              "שם פרטי",
              "שם משפחה",
              "מייל",
              "עיר",
              "טלפון",
              "סיסמה"]

 public options =[
    {
      value: "Customer",
      name : "לקוח"
    },
    {
      value: "Merchant",
      name : "סוחר"
    }
  ];


  /////////
  //User
  public AddUser:User={};
  public FindUser:User={};
  public CheckUserMail:boolean;
  /////
  //policy
  public policyClick=false;
  ///
  //city
public  City="";
  ///
  public OpenAlert:number;
  public Message:ResponseMessage={};

  constructor( private httpValidation:CheckValidationService,private router:Router,private httpUser:UserService,private httpMerchant:MerchantService,private httpCustomer:CustomerService) { }

  ngOnInit(): void {
  }



  async GetUserByMail(mail:string)
  {
    this.FindUser={};
    this.FindUser=await this.httpUser.GetUserByMail(mail);
  }
  async OnAddMerchant()
  {
    let merchant:Merchant={};
    merchant.City=this.City;
    merchant.UserId=this.FindUser.Id;
    await this.httpMerchant.addMerchant(merchant)
  }
  async OnAddCustomer()
  {
    let customer:Customer={};
    customer.City=this.City;
    customer.UserId=this.FindUser.Id;
    await this.httpCustomer.AddCustomer(customer);
  }

  async CheckMail()
  {
     this.CheckUserMail= await this.httpUser.CheckEmail(this.AddUser.Mail);
  }

  async OnAddUser()
  {
    this.Response[0] = await this.httpValidation.CheckFirstName(this.AddUser.FirstName);
    this.Response[1] = await this.httpValidation.CheckLastName(this.AddUser.LastName);
    this.Response[2] = await this.httpValidation.CheckEmail(this.AddUser.Mail);
    this.Response[3] = await this.httpValidation.CheckBirthdate(this.AddUser.Birthdate);
    this.Response[4] = await this.httpValidation.CheckCity(this.City);
    this.Response[5] = await this.httpValidation.CheckPhone(this.AddUser.Phone);
    this.Response[6] = await this.httpValidation.CheckRole(this.AddUser.Role);
    this.Response[7] = await this.httpValidation.ChaeckPassword(this.AddUser.Password);
    this.Response[8] = await this.httpValidation.CheckPolicy(this.policyClick);
    if(!this.Response[0].Isok || !this.Response[1].Isok ||
      !this.Response[2].Isok || !this.Response[3].Isok ||
      !this.Response[4].Isok || !this.Response[5].Isok ||
      !this.Response[6].Isok || !this.Response[7].Isok ||
      !this.Response[8].Isok)
      {
        return;
      }
      await this.CheckMail();
      if(this.CheckUserMail)
      {
        this.Response[2].Isok=false;
        this.Response[2].Message="מייל קיים במערכת!";
        return;
      }
       try
       {
        await this.httpUser.addUser(this.AddUser);
       }
      catch
      {
        this.Message.Isok=false;
        this.Message.Message="לא הצלחנו להוסיף את המשתמש נסה שנית";
        this.OpenAlert=1
        return;
      }

      try{
        await this.GetUserByMail(this.AddUser.Mail);
      }
      catch
      {
       this.Message.Isok=false;
       this.Message.Message="לא הצלחנו למצוא את המשתמש נסה שנית";
       this.OpenAlert=1
        return;
      }
      if(this.AddUser.Role=="Customer")
      {
        try{
          await this.OnAddCustomer();
        }
        catch
        {
          this.Message.Isok=false;
          this.Message.Message="לא הצלחנו לשמור את הלקוח";
          this.OpenAlert=1
          return;
        }
      }
      else
      {
        try{
          await this.OnAddMerchant();
        }
        catch
        {
          this.Message.Isok=false;
          this.Message.Message="לא הצלחנו לשמור את הסוחר";
          this.OpenAlert=1
          return;
        }
      }
      this.City=null;
      this.AddUser={};
      this.Message.Isok=true;
      this.Message.Message="תהליך ההרשמה בוצע בהצלחה, אנא התחבר";
      this.OpenAlert=1
  }



  ChangeOpenAlert(isok:boolean)
  {
    this.Message={};
    this.OpenAlert=0;
    if(isok)
    {
      this.router.navigate(['/LoginComponent']).then(() => {
        window.location.reload();
      });;;
    }
  }

}
