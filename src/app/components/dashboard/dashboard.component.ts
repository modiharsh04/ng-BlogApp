import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../../services/auth.service';
import { BlogsService } from '../../services/blogs.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user:User;
  alrt:string = "";

  constructor(private auth:AuthService,private blog:BlogsService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('loggedUser')) as User;
  }

  removeUser(){
    this.auth.removeUser(localStorage.getItem('token'))
              .then(res => {
                if (res === 'success'){
                  localStorage.clear();
                  window.location.reload();
                }
              }).catch(err => console.log(err));
  }
}
