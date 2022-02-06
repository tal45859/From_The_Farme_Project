import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseMessage } from 'src/app/model/ResponseMessage';
import { LoginService } from 'src/app/services/Login.service';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-merchant-to-customer',
  templateUrl: './merchant-to-customer.component.html',
  styleUrls: ['./merchant-to-customer.component.css']
})
export class MerchantToCustomerComponent implements OnInit {
@Input() public Token:string;
public OpenAlert:number;
public Message:ResponseMessage={};

  constructor(private httpMerchant:MerchantService, private httpLogin:LoginService,private router:Router) {

   }

  ngOnInit(): void {
  }

  async OnClickDeleteMerchantAndAddToCustomer()
    {
      try{
        await this.httpMerchant.DeleteMerchantForMerchant(this.Token);
      }
      catch
      {
        this.Message.Isok=false;
        this.Message.Message="לא הצלחנו למחוק את הסוחר";
        this.OpenAlert=1;
        return;
      }
      this.httpLogin.ShareRole=null;
      sessionStorage.clear();
      this.Message.Isok=true;
      this.Message.Message="העדכון בוצע בהצלחה";
      this.OpenAlert=1;
    }
    ChangeOpenAlert(isok:boolean)
    {
      this.Message={};
      this.OpenAlert=0;
      if(isok)
      {
        this.router.navigate(['/LoginComponent']).then(() => {
          window.location.reload();
        });;;
      }
    }

}
