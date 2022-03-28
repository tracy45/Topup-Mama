import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  profileForm!:FormGroup;
/*  loader:boolean;*/
  /*formattedaddress=" ";
  options= {
    componentRestrictions: {
      country: ["KENYA"]
    }
  }*/

  constructor(
    private _fb:FormBuilder,
    private router:Router,
    private userService:UserService
  ) { }

  ngOnInit() {
   this.profileForm=this._fb.group({
     name:['', Validators.required],
     position:['Manager', Validators.required]
   });

  }

  onSubmit(){
    this.userService.create(this.profileForm.value)
      .subscribe(data =>{
        this.router.navigate(['users']);
      })
  }
}
