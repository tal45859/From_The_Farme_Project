import { CustomerGuardService } from './services/CustomerGuard.service';
import { AdminGuardService } from './services/AdminGuard.service';
import { MerchantGuardService } from './services/MerchantGuard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './screens/AdminFolder/admin/admin.component';
import { CustomerComponent } from './screens/CustomerFolder/customer/customer.component';
import { FavoriteComponent } from './screens/CustomerFolder/favorite/favorite.component';
import { HomeComponent } from './screens/home/home.component';
import { MerchantComponent } from './screens/MerchantFolder/merchant/merchant.component';
import { PostsComponent } from './screens/MerchantFolder/posts/posts.component';
import { UsersComponent } from './screens/AdminFolder/users/users.component';
import { ForgotPasswordComponent } from './screens/LoginFolder/forgot-password/forgot-password.component';
import { RegisterComponent } from './screens/LoginFolder/register/register.component';
import { PolicyComponent } from './screens/LoginFolder/policy/policy.component';
import { LoginComponent } from './screens/LoginFolder/login/login.component';

const routes: Routes = [
{ path: 'HomeComponent', component: HomeComponent },
{ path: 'LoginComponent', component: LoginComponent },
{ path: 'ForgotPasswordComponent', component: ForgotPasswordComponent },
{ path: 'RegisterComponent', component: RegisterComponent },
{ path: 'PolicyComponent', component: PolicyComponent },
{ path: 'AdminComponent', component: AdminComponent ,canActivate:[AdminGuardService],},
{ path: 'MerchantComponent', component: MerchantComponent,canActivate:[MerchantGuardService]},
{ path: 'CustomerComponent', component: CustomerComponent ,canActivate:[CustomerGuardService]},
{ path: 'PostsComponent', component: PostsComponent ,canActivate:[MerchantGuardService]},
{ path: 'UsersComponent', component: UsersComponent ,canActivate:[AdminGuardService]},
{ path: 'FavoriteComponent', component: FavoriteComponent ,canActivate:[CustomerGuardService]},
{ path: '**', component:  HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
