import { LoginService } from './../../../../services/Login.service';
import { UserService } from './../../../../services/User.service';
import { Component, Input, OnInit } from '@angular/core';
import { Merchant } from 'src/app/model/Merchant';
import { Router } from '@angular/router';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-merchant-detaills',
  templateUrl: './merchant-detaills.component.html',
  styleUrls: ['./merchant-detaills.component.css']
})
export class MerchantDetaillsComponent implements OnInit {
 @Input() public MerchantDetaills:Merchant;
 @Input() public Token:string;
 public OpenAlert:number;
 public Message:ResponseMessage={};
  constructor(private httpUser:UserService, private httpLogin:LoginService,private router:Router) { }

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
