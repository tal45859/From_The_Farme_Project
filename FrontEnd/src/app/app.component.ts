import { Component} from '@angular/core';
import { admin, customer, defult, merchant } from './data/menu-items';
import { Menultem } from './model/menultem';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'fromethefarmer';
  public roleForNav=sessionStorage.getItem("nav");
  UserItems: Array<Menultem>=defult;
  AdminItems: Array<Menultem>=admin;
  CustomerItems: Array<Menultem>=customer;
  MercahntItems: Array<Menultem>=merchant;
}
