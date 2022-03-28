import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {first} from "rxjs";
import {UsersModel} from "../users--model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:UsersModel[] =[];
  loading= true

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getAll()
      .subscribe(users => {
      this.users = users;
    });

  }
  delete(users:UsersModel){
  this.userService.delete(users).pipe(first()).subscribe(()=>{
   this.loadAllUsers()
  });

  }
  edit(users:UsersModel){
    this.userService.edit(users).pipe(first()).subscribe(()=>{
      this.loadAllUsers()
    })
  }
private loadAllUsers(){
    this.userService.getAll().pipe(first()).subscribe(users=>{
      this.users=users;
    })
}

}
