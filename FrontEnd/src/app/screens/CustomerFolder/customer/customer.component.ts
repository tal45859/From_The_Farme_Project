import { ResponseMessage } from './../../../model/ResponseMessage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/Customer';
import { CustomerService } from 'src/app/services/Customer.service';
import { LoginService } from 'src/app/services/Login.service';
import { UserService } from 'src/app/services/User.service';
import { CheckValidationService } from 'src/app/services/CheckValidation.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  //navbar
  public OnClickNav=1;
  //
  public CustomerDetaills:Customer={};
  public Token:string;
  private passwordMd5="";
  constructor(private httpLogin: LoginService,private httpCustomer:CustomerService) { }
  async ngOnInit(): Promise<void> {
    this.Token=this.httpLogin.ShareData;
    await this.OnGetCustomerDeatills();
    this.httpLogin.ShareCity=this.CustomerDetaills.City;
    this.passwordMd5=this.CustomerDetaills.User.Password;
  }

  async OnGetCustomerDeatills()
  {
    this.CustomerDetaills =  await this.httpCustomer.GetCustomerbyJWT(this.Token);
  }

}
