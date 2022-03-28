import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../alert.service";
import {first} from "rxjs";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!:FormGroup;
  loading= false;
  submitted= false;


  constructor(
   private formBuilder: FormBuilder,
   private route: ActivatedRoute,
   private router:Router,
   private alertService: AlertService,
   private userService:UserService
  ) { }

  ngOnInit() {
    this.loginform= this.formBuilder.group({
      email: ['',Validators.required],
      password:['',Validators.required]
    });
    this.userService.logout();


  }

  get f() {return this.loginform.controls;}

  onsubmit() {
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }
  }
}
