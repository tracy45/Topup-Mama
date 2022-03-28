import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit,OnDestroy {
  alert-msg:any;
  private subscription: Subscription;


  constructor(private alertService:AlertService) { }

  ngOnInit() {
    this.subscription=this.alertService.getMessage().subscribe(alert-msg =>{
      this.alert-msg=alert-msg;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
