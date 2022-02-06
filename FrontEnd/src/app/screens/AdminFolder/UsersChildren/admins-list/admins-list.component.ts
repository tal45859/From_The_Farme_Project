import { AdminService } from 'src/app/services/Admin.service';
import { UserService } from 'src/app/services/User.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit {
  public AdminArr:Array<User>=[];
  @Input() public Token:string;
  public HasMail=false;
  public EmailToFind="";

  constructor(private httpAdmin:AdminService,private httpUser:UserService) { }

  async ngOnInit(): Promise<void> {
    await this.onGetAllAdmins();
  }


  async OnClickDownRank(id:number)
  {
      await this.httpAdmin.DeleteAdminById(id,this.Token);
      await this.onGetAllAdmins();
  }

  async onGetAllAdmins()
  {
    this.AdminArr=await this.httpAdmin.GetAllAdmins(this.Token);
  }

  async OnClickDelete(id:number)
  {
    await this.httpUser.DeleteUserForAdmin(id,this.Token);
    await this.onGetAllAdmins();
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
