import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './Login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuardService implements CanActivate {
  public getData:string;
  public role:string;
constructor(private httpLogin:LoginService)
 {
  this.getData=this.httpLogin.ShareData;
  this.role=this.httpLogin.ShareRole;
 }

  //תקציר
  ///////
  //שומר שרק לקוח יוכל להיכנס

  //שומר שרק לקוח יוכל להיכנס
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.getData!=null&&this.role=="Customer";
  }
}
