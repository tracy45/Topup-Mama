import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  loading=false;
  submitted=false

  constructor(
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.registerForm= this.formBuilder.group({
      email:['', Validators.required],
      password:['',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?:,])[a-zA-Z!@#$%^&*?:,]+$')]]
    });
  }

  get f() {return this.registerForm.controls;}

  onsubmit(){
    this.submitted= true;

    if(this.registerForm.invalid){
      return;
    }
    this.loading=true;

  }


}
