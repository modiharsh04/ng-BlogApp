import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  loggedIn:boolean = false;

  constructor(private auth:AuthService) {}

  ngOnInit() {
    this.auth.isAuth$
             .subscribe(val => {this.loggedIn = val});
  }

  logout(){
    this.auth.logout();
  }

}
