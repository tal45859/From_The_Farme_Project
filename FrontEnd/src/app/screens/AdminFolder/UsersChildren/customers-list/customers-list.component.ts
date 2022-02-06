import { UserService } from 'src/app/services/User.service';
import { CustomerService } from 'src/app/services/Customer.service';
import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/Customer';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  public CustomerArr:Array<Customer>=[];
  @Input() Token:string;
  public HasMail=false;
  public EmailToFind="";

  constructor(private httpCustomer:CustomerService,private httpUser:UserService) { }

  async ngOnInit(): Promise<void> {
   await this.onGetAllCustomer();
  }

  async onGetAllCustomer()
  {
    this.CustomerArr = await this.httpCustomer.GetAllCustomersForAdmin(this.Token);
  }

  async OnClickDelete(id:number)
  {
    await this.httpUser.DeleteUserForAdmin(id,this.Token);
    await this.onGetAllCustomer();
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
