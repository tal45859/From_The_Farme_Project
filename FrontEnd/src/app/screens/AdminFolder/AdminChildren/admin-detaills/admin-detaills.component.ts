import { ResponseMessage } from './../../../../model/ResponseMessage';
import { LoginService } from '../../../../services/Login.service';
import { UserService } from '../../../../services/User.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-detaills',
  templateUrl: './admin-detaills.component.html',
  styleUrls: ['./admin-detaills.component.css']
})
export class AdminDetaillsComponent implements OnInit {
  @Input() public AdminDetaills:User={}
  @Input()  public Token:string;
  // public Message:string;
  // public SeccsusOrError:number;
  public Message:ResponseMessage={};


  public OpenAlert:number;
  constructor(private httpUser:UserService,private httpLogin:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  async OnClickDelete()
  {
    try{
      await this.httpUser.DeleteUserByJWT(this.Token);
    }
    catch
    {
      this.Message.Isok = false;
      this.Message.Message ="לא הצלחנו למחוק את המשתמש";
      this.OpenAlert=1;
      return;
    }
    this.httpLogin.ShareRole=null;
    sessionStorage.clear();
    this.Message.Message = "המשתמש נמחק בהצלחה";
    this.Message.Isok = true;
    this.OpenAlert=1;
  }

  ChangeOpenAlert(isok:boolean)
  {
    this.Message={};
    this.OpenAlert=0;
    if(isok == true)
    {
      this.router.navigate(['/HomeComponent']).then(() => {
        window.location.reload();
      });;;
    }
  }



}
