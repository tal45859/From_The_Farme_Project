import { UserService } from 'src/app/services/User.service';
import { Component, Input, OnInit } from '@angular/core';
import { Merchant } from 'src/app/model/Merchant';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-merchants-list',
  templateUrl: './merchants-list.component.html',
  styleUrls: ['./merchants-list.component.css']
})
export class MerchantsListComponent implements OnInit {
  public MerchantArr:Array<Merchant>=[];
  @Input() public Token:string;
  public HasMail=false;
  public EmailToFind="";



  constructor(private httpMerchant:MerchantService,private httpUser:UserService) { }

  async ngOnInit(): Promise<void> {
    await this.onGetAllMerchants();
  }


  async onGetAllMerchants()
  {
    this.MerchantArr = await this.httpMerchant.GetAllMerchants(this.Token);
  }

  async OnClickDelete(id:number)
  {
    await this.httpUser.DeleteUserForAdmin(id,this.Token);
    await this.onGetAllMerchants();
  }
  ChangeHasMail(isok: boolean)
  {
      this.HasMail=isok;
  }

  GetEmail(Email: string)
  {
      this.EmailToFind=Email;
  }

}
