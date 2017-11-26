import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	user:User = {};
	alrt:string = "";
	loading:boolean = false;

	constructor(private auth:AuthService,private router:Router) { }

	ngOnInit() {}

	login(){
		this.alrt = ""
		this.loading = true;
		this.auth.login(this.user)
					.then(res => this.router.navigate(['/dashboard']))
					.catch(err => {
						if (err.status!==400)
							this.alrt = "Server error";
						else
							this.alrt = "Wrong credentials";
						this.loading = false;
					});
	}

}
