import { ResponseMessage } from './../../../../model/ResponseMessage';
import { UserService } from '../../../../services/User.service';
import { CheckValidationService } from 'src/app/services/CheckValidation.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  @Input() public AdminDetaills:User={}
  @Input() public Token:string;
  @Input() public passwordMd5:string;

  public Response:Array<ResponseMessage>=[
    {Isok:true, Message:'' },
    {Isok:true, Message:'' },
    {Isok:true, Message:'' },
    {Isok:true, Message:'' },
    {Isok:true, Message:'' }];
    public Type="password";
    public ShowPassword=false;

  public Message:ResponseMessage={};
  public OpenAlert:number;
    //errormessage

  constructor(private httpValidation:CheckValidationService,private httpUser:UserService) { }

  ngOnInit(): void {
  }

  async OnUpdate()
  {

    this.Response[0] = await this.httpValidation.CheckFirstName(this.AdminDetaills.FirstName);
    this.Response[1] = await this.httpValidation.CheckLastName(this.AdminDetaills.LastName);
    this.Response[2] = await this.httpValidation.CheckBirthdate(this.AdminDetaills.Birthdate);
    this.Response[3] = await this.httpValidation.CheckPhone(this.AdminDetaills.Phone);
    if(this.passwordMd5 != this.AdminDetaills.Password)
    {
      this.Response[4] = await this.httpValidation.ChaeckPassword(this.AdminDetaills.Password);
    }
    if(!this.Response[0].Isok ||!this.Response[1].Isok ||
      !this.Response[2].Isok || !this.Response[3].Isok ||
      !this.Response[4].Isok)
      {
        return;
      }
        try{
          await this.httpUser.UpdateUser(this.AdminDetaills,this.Token);
        }
        catch{
          this.Message.Isok=false;
          this.Message.Message="לא הצלחנו לשמור את השינוים";
          this.OpenAlert=1;

          return;
        }
        this.Message.Isok=true;
        this.Message.Message="העדכון בוצע בהצלחה";
        this.OpenAlert=1;
  }
  ChangeOpenAlert(isok:boolean)
  {
    this.Message={};
    this.OpenAlert=0;
    if(isok == true)
    {
      window.location.reload();
    }
  }
}
