import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ResponseMessage } from 'src/app/model/ResponseMessage';


@Component({
  selector: 'app-toast-b',
  templateUrl: './toast-b.component.html',
  styleUrls: ['./toast-b.component.css']
})
export class ToastBComponent implements OnInit {
@Input() public Messages:ResponseMessage={};
@Output() public close = new EventEmitter<boolean>();//1= close Succsess // 2= Colse Error
  ngOnInit(): void {
    this.TimeToToast();
  }


    public TimeToToast()
  {
    setTimeout(() => {
      this.close.emit(this.Messages.Isok);
    }, 3000);
  }





}
