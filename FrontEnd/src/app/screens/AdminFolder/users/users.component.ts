import { Merchant } from '../../../model/Merchant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AdminService } from 'src/app/services/Admin.service';
import { LoginService } from 'src/app/services/Login.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { UserService } from 'src/app/services/User.service';
import { Customer } from 'src/app/model/Customer';
import { CustomerService } from 'src/app/services/Customer.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //btn nav
  public BtnNav=1;//1=admin,2=merchant,3=customer

   // option nav for Admin
   public OptionAdminBtn=1;
   ////////

  //  Token
  public Token:string;

  constructor(private httpLogin: LoginService) { }
  async ngOnInit(): Promise<void> {
    this.Token=this.httpLogin.ShareData;
  };

  public OnClickNav2ForAdmin(id:number)
  {
    this.OptionAdminBtn=id;
  }

}
