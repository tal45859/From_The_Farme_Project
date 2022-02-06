import { Category } from "./Category";
import { Merchant } from "./Merchant";
import { Product } from "./Product";

export class Post{
    public Id?:number;
    public MerchantId?:number;
    public ProductId?:number;
    public CategoryId?:number;
    public CreatedAt?:Date;
    public Merchant?:Merchant;
    public IsShip?:boolean;
    public Product?:Product;
    public Category?:Category;
}

