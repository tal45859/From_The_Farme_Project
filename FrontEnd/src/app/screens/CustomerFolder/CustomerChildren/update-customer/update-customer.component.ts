import { CheckValidationService } from 'src/app/services/CheckValidation.service';
import { UserService } from '../../../../services/User.service';
import { CustomerService } from '../../../../services/Customer.service';

import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/Customer';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
@Input() public CustomerDetaills:Customer;
@Input() public Token:string;
@Input() public passwordMd5:string;

  //errormessage
  public Response:Array<ResponseMessage>=[
    {Isok:true, Message:''},
    {Isok:true, Message:''},
    {Isok:true, Message:''},
    {Isok:true, Message:''},
    {Isok:true, Message:''},
    {Isok:true, Message:''}
  ];
  public Type="password";
  public ShowPassword=false;

  public OpenAlert:number;
  public Message:ResponseMessage={};
  //////
  constructor(private httpCustomer:CustomerService,private httpUser:UserService,private httpValidation:CheckValidationService) { }

  ngOnInit(): void {

  }

  async OnUpdate()
  {
    this.Response[0] = await this.httpValidation.CheckFirstName(this.CustomerDetaills.User.FirstName);
    this.Response[1] = await this.httpValidation.CheckLastName(this.CustomerDetaills.User.LastName);
    this.Response[2] = await this.httpValidation.CheckBirthdate(this.CustomerDetaills.User.Birthdate);
    this.Response[3] = await this.httpValidation.CheckPhone(this.CustomerDetaills.User.Phone);
    this.Response[4] = await this.httpValidation.CheckCity(this.CustomerDetaills.City);
    if(this.passwordMd5 != this.CustomerDetaills.User.Password)
    {
      this.Response[5] = await this.httpValidation.ChaeckPassword(this.CustomerDetaills.User.Password);
    }
    if(!this.Response[0].Isok || !this.Response[1].Isok ||
      !this.Response[2].Isok || !this.Response[3].Isok ||
      !this.Response[4].Isok || !this.Response[5].Isok )
      {
        return;
      }
      try
      {
        await this.httpUser.UpdateUser(this.CustomerDetaills.User,this.Token);
      }
      catch
      {
        this.Message.Message="לא הצלחנו לשמור את פרטי המשתמש";
        this.Message.Isok=false;
        this.OpenAlert=1;
        return;
      }
      try
      {
        await this. httpCustomer.UpdateCustomer(this.CustomerDetaills,this.Token);
      }
      catch
      {
        this.Message.Message="לא הצלחנו לשמור את פרטי הלקוח";
        this.Message.Isok=false;
        this.OpenAlert=1;
        return;
      }
      this.Message.Message="עודכן בהצלחה";
      this.Message.Isok=true;
      this.OpenAlert=1;
  }

  ChangeOpenAlert(isok:boolean)
  {
    this.Message={};
    this.OpenAlert=0;
    if(isok)
    {
      window.location.reload();
    }
  }
}
