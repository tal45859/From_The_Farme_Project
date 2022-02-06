import { UserService } from './../../../services/User.service';
import { LoginService } from './../../../services/Login.service';
import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/model/Login';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { CheckValidationService } from 'src/app/services/CheckValidation.service';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//placeHolder

  public Type="password";
  public ShowPassword=false;
////

//errorMessage
 public ErrorMesssage="";
 public Response:Array<ResponseMessage>=[{Isok:true, Message:'' },{Isok:true, Message:'' }];
/////////

//obj to Login
public LoginObj:Login={};
/////
//objUser
public singelitem:User={};
//

  constructor(private httpValidation:CheckValidationService, private http:LoginService,private httpUser:UserService ,private router:Router) { }

  ngOnInit(): void {
  }

  async OnGetUser()
  {
   this.singelitem = await this.httpUser.GetUserByJwt(this.http.ShareData);
  }

  async OnGetUtha()
  {
    this.ErrorMesssage='';
    this.Response[0] =await this.httpValidation.CheckEmail(this.LoginObj.email);
    this.Response[1] =await this.httpValidation.ChaeckPassword(this.LoginObj.password);
    if(!this.Response[0].Isok || !this.Response[1].Isok)
    {
      return;
    }
    try {
      this.http.ShareData=await this.http.GetAtuh(this.LoginObj);
      await this.OnGetUser();
      this.http.ShareRole=this.singelitem.Role;
      if(this.singelitem.Role=="Admin")
      {
        sessionStorage.setItem("nav", "Admin");
       this.router.navigate(['/AdminComponent']).then(() => {
          window.location.reload();
        });;
      }
      else if(this.singelitem.Role=="Merchant")
      {
        sessionStorage.setItem("nav", "Merchant");
        this.router.navigate(['/MerchantComponent']).then(() => {
          window.location.reload();
        });;;
      }
      else if(this.singelitem.Role=="Customer")
      {
        sessionStorage.setItem("nav", "Customer");
        this.router.navigate(['/CustomerComponent']).then(() => {
          window.location.reload();
        });;;
      }
    } catch
    {
      //לעשות אלרט
      this.ErrorMesssage="מייל או סיסמה אינם נכונים!";
    }
  }

}
