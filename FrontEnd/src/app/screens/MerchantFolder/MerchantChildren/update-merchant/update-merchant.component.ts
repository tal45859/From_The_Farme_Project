import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Merchant } from 'src/app/model/Merchant';
import { ResponseMessage } from 'src/app/model/ResponseMessage';
import { CheckValidationService } from 'src/app/services/CheckValidation.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-update-merchant',
  templateUrl: './update-merchant.component.html',
  styleUrls: ['./update-merchant.component.css']
})
export class UpdateMerchantComponent implements OnInit {
   @Input() public MerchantDetaills:Merchant;
   @Input() public Token:string;
   @Input() public passwordMd5:string;

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
  constructor(private httpValidation:CheckValidationService, private httpUser:UserService, private httpMerchant:MerchantService) { }

  ngOnInit(): void {
  }

  async OnUpdate() {

    this.Response[0] = await this.httpValidation.CheckFirstName(this.MerchantDetaills.User.FirstName);
    this.Response[1] = await this.httpValidation.CheckLastName(this.MerchantDetaills.User.LastName);
    this.Response[2] = await this.httpValidation.CheckBirthdate(this.MerchantDetaills.User.Birthdate);
    this.Response[3] = await this.httpValidation.CheckPhone(this.MerchantDetaills.User.Phone);
    this.Response[4] = await this.httpValidation.CheckCity(this.MerchantDetaills.City);
    if(this.passwordMd5 != this.MerchantDetaills.User.Password)
    {
      this.Response[5] = await this.httpValidation.ChaeckPassword(this.MerchantDetaills.User.Password);
    }
    if(!this.Response[0].Isok || !this.Response[1].Isok ||
      !this.Response[2].Isok || !this.Response[3].Isok ||
      !this.Response[4].Isok || !this.Response[5].Isok )
      {
        return;
      }
      try
      {
        await this.httpUser.UpdateUser(this.MerchantDetaills.User,this.Token);
      }
      catch
      {
        this.Message.Isok=false;
        this.Message.Message="לא הצלחנו לשמור את פרטי המשתמש";
        this.OpenAlert=1;
        return;
      }
      try
      {
        await this.httpMerchant.updateMerchant(this.MerchantDetaills,this.Token);
      }
      catch
      {
        this.Message.Isok=false;
        this.Message.Message="לא הצלחנו לשמור את פרטי הסוחר";
        this.OpenAlert=1;
        return;
      }

      this.Message.Isok=true;
      this.Message.Message="עודכן בהצלחה";
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
