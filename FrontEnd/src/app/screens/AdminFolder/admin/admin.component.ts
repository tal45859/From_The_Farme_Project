import { ImageService } from '../../../services/Image.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AdminService } from 'src/app/services/Admin.service';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //nav
  public OnClickNav=1;
  public passwordMd5="";
  public AdminDetaills:User={};
  private Token:string;

  constructor(private httpLogin:LoginService,private httpAdmin:AdminService) { }

  async ngOnInit(): Promise<void> {
    this.Token=this.httpLogin.ShareData;
    await this.OnGetAdminDetaills();
    this.passwordMd5 = this.AdminDetaills.Password;
  }

  async OnGetAdminDetaills()
  {
    this.AdminDetaills =  await this.httpAdmin.GetAdminByJWT(this.Token);
  }
}
