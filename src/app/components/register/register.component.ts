import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	private user:User = {};

	constructor(private router: Router,private auth:AuthService) { }

  ngOnInit() {

  }

  register(){
  	this.auth.register(this.user)
			.then(token => {
				localStorage.setItem('token',token);
				this.router.navigate(['/dashboard']);
			})
			.catch(err => console.log(err));
  }

}
