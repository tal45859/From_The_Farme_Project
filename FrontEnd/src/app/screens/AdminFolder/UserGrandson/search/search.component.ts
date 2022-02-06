import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/model/Customer';
import { Merchant } from 'src/app/model/Merchant';
import { ResponseMessage } from 'src/app/model/ResponseMessage';
import { User } from 'src/app/model/User';
import { CheckValidationService } from 'src/app/services/CheckValidation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() public AllUsersNotAdmin:Array<User>;
  @Input() public AdminArr:Array<User>;
  @Input() public CustomerArr:Array<Customer>;
  @Input() public MerchantArr:Array<Merchant>;
  @Input() public Id:number;
  @Output() public HasMail = new EventEmitter<boolean>();
  @Output() public Email = new EventEmitter<string>();
//placeholde
public  placholderMail="חיפוש על פי מייל";
///////////

   //Email
   public EmailToFind="";
   //message
   public Response:ResponseMessage={Isok:true,Message:''};


  constructor(private httpValidation:CheckValidationService) { }

  ngOnInit(): void {
  }

  async onClickSearchByEmail()
    {
      //צריך לעבור על ולבדוק האם יש תוצאות חיפוש בכל אחד מהבדיקות לפי הרישמת שלו כגון אדמין באדמינים
      //סוחר בסוחרים ועוד ובנוסף צריך להחזיר אם יש אז שיראה אם לא אז שיקפיץ אלרט שאין תוצאות חיפוש
    //  if(this.EmailToFind=="")
    //  {
    //    this.placholderMail ="עליך להזין ערך!";
    //    this.Response.Isok=false;
    //    this.Response.Message="אנא הזן ערך!";
    //   return;
    //  }
     this.Response = await this.httpValidation.CheckEmail(this.EmailToFind);
      if(!this.Response.Isok)
      {
        return;
      }

      if(this.Id==1)
      {
        for(let i = 0; i < this.AdminArr.length;i++)
        {
          if(this.AdminArr[i].Mail == this.EmailToFind)
          {
            this.HasMail.emit(true);
            this.Email.emit(this.EmailToFind);
            return;
          }
        }
       this.Response.Message="מייל לא קיים במערכת!";
       this.Response.Isok=false;
        return;
      }
      else if(this.Id==2)
      {
        for(let i = 0; i < this.AllUsersNotAdmin.length;i++)
        {
          if(this.AllUsersNotAdmin[i].Mail == this.EmailToFind)
          {
           this.HasMail.emit(true);
           this.Email.emit(this.EmailToFind);
            return;
          }
        }
        this.Response.Message="מייל לא קיים במערכת!";
        this.Response.Isok=false;
        return;
      }
      else if(this.Id==3)
      {
        for(let i = 0; i < this.MerchantArr.length;i++)
        {
          if(this.MerchantArr[i].User.Mail == this.EmailToFind)
          {
            this.HasMail.emit(true);
            this.Email.emit(this.EmailToFind);
            return;
          }
        }
        this.Response.Message="מייל לא קיים במערכת!";
        this.Response.Isok=false;
        return;
      }
      else if(this.Id==4)
      {
        for(let i = 0; i < this.CustomerArr.length;i++)
        {
          if(this.CustomerArr[i].User.Mail == this.EmailToFind)
          {
           this.HasMail.emit(true);
           this.Email.emit(this.EmailToFind);
            return;
          }
        }
        this.Response.Message="מייל לא קיים במערכת!";
        this.Response.Isok=false;
        return;
      }
    }

    public OnClickResetInput()
    {
      this.Response.Isok=true;
      this.placholderMail="חיפוש על פי מייל";
      this.EmailToFind="";
      this.Email.emit('');
      this.HasMail.emit(false);
    }

}
