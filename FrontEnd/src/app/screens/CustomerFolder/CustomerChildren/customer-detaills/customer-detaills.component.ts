import { ResponseMessage } from './../../../../model/ResponseMessage';
import { LoginService } from '../../../../services/Login.service';
import { UserService } from '../../../../services/User.service';
import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/Customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-detaills',
  templateUrl: './customer-detaills.component.html',
  styleUrls: ['./customer-detaills.component.css']
})
export class CustomerDetaillsComponent implements OnInit {
  @Input() public CustomerDetaills:Customer;
  @Input() public Token:string;
  public OpenAlert:number;
  public Message:ResponseMessage={};
  constructor( private httpUser:UserService,private httpLogin:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  async OnClickDelete()
  {
    try{
      await this.httpUser.DeleteUserByJWT(this.Token);
    }
    catch
    {

      this.Message.Isok=false;
      this.Message.Message="לא הצלחנו למחוק את המשתמש";
      this.OpenAlert=1;
      return;
    }
    this.httpLogin.ShareRole=null;
    sessionStorage.clear();
    this.Message.Isok=true;
    this.Message.Message="המשתמש נמחק בהצלחה";
    this.OpenAlert=1;

  }

  ChangeOpenAlert(isok:boolean)
  {
    this.Message={};
    this.OpenAlert=0;
    if(isok)
    {
      this.router.navigate(['/HomeComponent']).then(() => {
        window.location.reload();
      });;;
    }
  }

}
