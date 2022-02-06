import {User} from './../../../model/User';
import {UserService} from './../../../services/User.service';
import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CheckValidationService } from 'src/app/services/CheckValidation.service';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  //שחכתי סיסמה
  public MailToForgotPassword = "";
  //
  ///////
  //error
  public ErrorMail = "";
  ///
  //UserObjToFind
  public FindUser: User = {};
  ////
  //
  public OpenAlert=0;
  //
  public Message:ResponseMessage={};

  public Response:ResponseMessage={Isok:true,Message:''};
  constructor(private httpValidation:CheckValidationService,private httpUser: UserService, private router:Router) {}

  ngOnInit(): void {}

  async OnClickForgotPassword()
  {
    this.ErrorMail='';
    this.Response = await this.httpValidation.CheckEmail(this.MailToForgotPassword);
    if(!this.Response.Isok)
    {
      return;
    }
    try {
      await this.GetUserByMail(this.MailToForgotPassword);
      if (this.FindUser.Mail != null) {
        try {
          //לשנות את הסיסמה שלו בשרת
          await this.httpUser.ForgotPassword(this.MailToForgotPassword);
          this.Message.Message="השינוי בוצע בהצלחה אנא בדוק במייל את סיסמתך החדשה";
          this.Message.Isok=true;
          this.OpenAlert=1;
          return;
          //לנווט אותו להתחברות
        } catch {
          //לא הצלחנו לשנות את הסיסמה בשרת
        }
        return;
      }
    } catch {
      this.ErrorMail = "מייל לא קיים במערכת!";
      return;
    }
  }

  async GetUserByMail(mail: string) {
    this.FindUser = {};
    this.FindUser = await this.httpUser.GetUserByMail(mail);
  }

  ChangeOpenAlert(isok:boolean)
  {
    this.Message={};
    this.OpenAlert=0;
    this.router.navigate(['/LoginComponent']).then(() => {
      window.location.reload();
    });;;
  }

}
