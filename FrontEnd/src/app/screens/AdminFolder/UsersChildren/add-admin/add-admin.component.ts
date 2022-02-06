import { AdminService } from 'src/app/services/Admin.service';
import { UserService } from 'src/app/services/User.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  public AllUsersNotAdmin:Array<User>=[];
  @Input() public Token:string;
  public HasMail=false;
  public EmailToFind="";

  constructor(private httpUser:UserService,private httpAdmin:AdminService) { }

  async ngOnInit(): Promise<void> {
    await this. GetAllUsersNotAdmin();
  }

  async GetAllUsersNotAdmin()
  {
    this.AllUsersNotAdmin = await this.httpUser.GetAllUsersNotAdmin(this.Token);
  }

  async OnAddAdmin(obj:User)
  {
    if(obj.Id!=null)
    {
      await this.httpAdmin.AddAdmin(obj,this.Token);
      await this.GetAllUsersNotAdmin();
    }
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
