import { Menultem } from "../model/menultem";


//items > array of objects
export const defult: Array<Menultem> = [
    {
      name: 'דף הבית',
      url: 'HomeComponent',
      isshow: true
    },
    {
      name: 'התחברות',
      url: 'LoginComponent',
      isshow: true
    },
];

export const admin: Array<Menultem> = [
  {
    name: 'דף הבית',
    url: 'HomeComponent',
    isshow: true
  },
  {
    name: 'ניהול משתמשים',
    url: 'UsersComponent',
    isshow: true
  },

  {
    name: 'פרטים אישים',
    url: 'AdminComponent',
    isshow: true
  }
];

export const merchant: Array<Menultem> = [
  {
    name: 'דף הבית',
    url: 'HomeComponent',
    isshow: true
  },
  {
    name: 'ניהול מודעות',
    url: 'PostsComponent',
    isshow: true
  },
  {
    name: 'פרטים אישים',
    url: 'MerchantComponent',
    isshow: true
  }
];

export const customer: Array<Menultem> = [
  {
    name: 'דף הבית',
    url: 'HomeComponent',
    isshow: true
  },
  {
    name: 'מועדפים',
    url: 'FavoriteComponent',
    isshow: true
  },
  {
    name: 'פרטים אישים',
    url: 'CustomerComponent',
    isshow: true
  }
];

