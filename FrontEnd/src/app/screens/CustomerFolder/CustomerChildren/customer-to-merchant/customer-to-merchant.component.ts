
import { LoginService } from '../../../../services/Login.service';
import { CustomerService } from '../../../../services/Customer.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseMessage } from 'src/app/model/ResponseMessage';

@Component({
  selector: 'app-customer-to-merchant',
  templateUrl: './customer-to-merchant.component.html',
  styleUrls: ['./customer-to-merchant.component.css']
})
export class CustomerToMerchantComponent implements OnInit {
  @Input() public Token:string;
  public OpenAlert:number;
  public Message:ResponseMessage={};
  constructor(private httpCustomer:CustomerService,private httpLogin:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  async OnClickDeleteCustomerAndAddToMerchant()
  {
    try{
      await this.httpCustomer.DeleteCustomerToAddMerchantByJwt(this.Token);
    }
    catch
    {
      this.Message.Isok=false;
      this.Message.Message="לא הצלחנו לעדכן את השינוי";
      this.OpenAlert=1;
      return;
    }
    this.httpLogin.ShareRole=null;
    sessionStorage.clear();
    this.Message.Message="העדכון בוצע בהצלחה";
    this.Message.Isok=true;
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
