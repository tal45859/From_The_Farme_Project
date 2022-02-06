import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './Login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  public getData:string;
  public role:string;
constructor(private httpLogin:LoginService)
 {
  this.getData=this.httpLogin.ShareData;
  this.role=this.httpLogin.ShareRole;
 }
 //תקציר
 ///////
 //שומר שרק מנהל יוכל להיכנס

 //שומר שרק מנהל יוכל להיכנס
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.getData!=null&&this.role=="Admin";
  }
}

