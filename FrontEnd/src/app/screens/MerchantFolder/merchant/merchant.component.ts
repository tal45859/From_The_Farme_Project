import { Merchant } from 'src/app/model/Merchant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/Login.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { UserService } from 'src/app/services/User.service';
import { CustomerService } from 'src/app/services/Customer.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {
  //nav
  public OnClickNav=1;
  ////
  public passwordMd5="";
  public MerchantDetaills:Merchant={};
  public Token:string;
  constructor(private httpLogin: LoginService,public router:Router,private httpUser:UserService,private httpMerchant:MerchantService,private httpCustomer:CustomerService) { }
  async ngOnInit(): Promise<void> {
    this.Token=this.httpLogin.ShareData;
    await this.OnGetMerchantDeatills();
    this.httpLogin.ShareCity=this.MerchantDetaills.City;
    this.passwordMd5=this.MerchantDetaills.User.Password;
  }

  async OnGetMerchantDeatills()
  {
    this.MerchantDetaills =  await this.httpMerchant.GetMerchantByJwt(this.Token);
  }

}
