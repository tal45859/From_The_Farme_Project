import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdminComponent } from './screens/AdminFolder/admin/admin.component';
import { MerchantComponent } from './screens/MerchantFolder/merchant/merchant.component';
import { CustomerComponent } from './screens/CustomerFolder/customer/customer.component';
import { ContentComponent } from './layout/content/content.component';
import { HeaderComponent } from './layout/header/header.component';
import { FormsModule } from '@angular/forms';
import { PostsComponent } from './screens/MerchantFolder/posts/posts.component';
import { UsersComponent } from './screens/AdminFolder/users/users.component';
import { FavoriteComponent } from './screens/CustomerFolder/favorite/favorite.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ForgotPasswordComponent } from './screens/LoginFolder/forgot-password/forgot-password.component';
import { PolicyComponent } from './screens/LoginFolder/policy/policy.component';
import { RegisterComponent } from './screens/LoginFolder/register/register.component';
import { LoginComponent } from './screens/LoginFolder/login/login.component';
import { UpdateCustomerComponent } from './screens/CustomerFolder/CustomerChildren/update-customer/update-customer.component';
import { CustomerToMerchantComponent } from './screens/CustomerFolder/CustomerChildren/customer-to-merchant/customer-to-merchant.component';
import { CustomerDetaillsComponent } from './screens/CustomerFolder/CustomerChildren/customer-detaills/customer-detaills.component';
import { UpdateAdminComponent } from './screens/AdminFolder/AdminChildren/update-admin/update-admin.component';
import { AdminDetaillsComponent } from './screens/AdminFolder/AdminChildren/admin-detaills/admin-detaills.component';
import { MerchantDetaillsComponent } from './screens/MerchantFolder/MerchantChildren/merchant-detaills/merchant-detaills.component';
import { MerchantToCustomerComponent } from './screens/MerchantFolder/MerchantChildren/merchant-to-customer/merchant-to-customer.component';
import { UpdateMerchantComponent } from './screens/MerchantFolder/MerchantChildren/update-merchant/update-merchant.component';
import { AdminsListComponent } from './screens/AdminFolder/UsersChildren/admins-list/admins-list.component';
import { AddAdminComponent } from './screens/AdminFolder/UsersChildren/add-admin/add-admin.component';
import { MerchantsListComponent } from './screens/AdminFolder/UsersChildren/merchants-list/merchants-list.component';
import { CustomersListComponent } from './screens/AdminFolder/UsersChildren/customers-list/customers-list.component';
import { SearchComponent } from './screens/AdminFolder/UserGrandson/search/search.component';
import { UpdatePostComponent } from './screens/MerchantFolder/PostChildren/UpdatePostFolder/update-post/update-post.component';
import { AddPostComponent } from './screens/MerchantFolder/PostChildren/AddPostFolder/add-post/add-post.component';
import { AddPostHomeComponent } from './screens/MerchantFolder/PostChildren/AddPostFolder/add-post-home/add-post-home.component';
import { AddProductComponent } from './screens/MerchantFolder/PostChildren/AddPostFolder/add-product/add-product.component';
import { AddImageComponent } from './screens/MerchantFolder/PostChildren/AddPostFolder/add-image/add-image.component';
import { UpdatePostHomeComponent } from './screens/MerchantFolder/PostChildren/UpdatePostFolder/update-post-home/update-post-home.component';
import { UpdateImageComponent } from './screens/MerchantFolder/PostChildren/UpdatePostFolder/update-image/update-image.component';
import { UpdateProductComponent } from './screens/MerchantFolder/PostChildren/UpdatePostFolder/update-product/update-product.component';
import { AllPostComponent } from './screens/PostHelper/all-post/all-post.component';
import { PostDetailsComponent } from './screens/PostHelper/post-details/post-details.component';
import { PostSearchComponent } from './screens/PostHelper/post-search/post-search.component';
import { ToastBComponent } from './screens/toast/toast-b/toast-b.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    MerchantComponent,
    CustomerComponent,
    PostsComponent,
    UsersComponent,
    FavoriteComponent,
    ForgotPasswordComponent,
    PolicyComponent,
    RegisterComponent,
    UpdateCustomerComponent,
    CustomerToMerchantComponent,
    CustomerDetaillsComponent,
    UpdateAdminComponent,
    AdminDetaillsComponent,
    MerchantDetaillsComponent,
    MerchantToCustomerComponent,
    UpdateMerchantComponent,
    AdminsListComponent,
    AddAdminComponent,
    MerchantsListComponent,
    CustomersListComponent,
    SearchComponent,
    UpdatePostComponent,
    AddPostComponent,
    AddPostHomeComponent,
    AddProductComponent,
    AddImageComponent,
    UpdatePostHomeComponent,
    UpdateImageComponent,
    UpdateProductComponent,
    AllPostComponent,
    PostDetailsComponent,
    PostSearchComponent,
    ToastBComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,HomeComponent]
})
export class AppModule {}

