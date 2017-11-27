import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()
export class AuthService {
	private BASE_URL: string = 'http://localhost:8000';
	private headers: Headers = new Headers({'Content-Type': 'application/json'});
	private isAuthenticated = new BehaviorSubject<boolean>(tokenNotExpired());
	isAuth$ = this.isAuthenticated.asObservable();

	constructor(
		private http:Http,
		private router:Router,
		private jwh:JwtHelper
		) {}

	login(user:User): Promise<any> {
		let url = `${this.BASE_URL}/login`;
		return this.http.post(url, user, {headers: this.headers})
		                .toPromise()
		                .then(res => this.loginSuccess(res.json().token))
		                .catch(this.handleError);
	}

	register(user:User): Promise<any> {
		let url = `${this.BASE_URL}/register`;
		return this.http.post(url, user, {headers: this.headers})
		                .toPromise()
		                .then(res => this.loginSuccess(res.json().token))
		                .catch(this.handleError);
	}

	removeUser(token:string): Promise<any>{
		let url = `${this.BASE_URL}/delete`;
		let headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: `${token}`
		});
		return this.http.delete(url,{headers : headers})
						.toPromise()
						.then(res => res.json().status)
		                .catch(this.handleError);
	}

	refresh(token:string){
		let url = `${this.BASE_URL}/refresh`;
		let data = { 'token':token }
		this.http.post(url,data,{headers:this.headers})
				.toPromise()
				.then(res => res.json().token)
				.then(token => this.loginSuccess(token))
				.catch(err => this.logout())
				.catch(err => this.handleError);
	}

	loginSuccess(token:string){
		this.isAuthenticated.next(true);
		localStorage.setItem('token',token);
		let jwh = new JwtHelper();
		var loggedUser = jwh.decodeToken(token);
		loggedUser = {
			'username': loggedUser.username,
			'email': loggedUser.email
		}
		localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
		this.delay(jwh.getTokenExpirationDate(token).getTime() - Date.now() - 5000)
			.then((val)=>{
				if (tokenNotExpired())
					this.refresh(localStorage.getItem('token'));
				else
					this.logout()
			})
			.catch(err => this.handleError);
		return Promise.resolve(true);
	}

	logout(){
		localStorage.clear();
		this.isAuthenticated.next(false);
		this.router.navigate(['/blogs']);
	}

	private handleError(err:any):Promise<any> {
	  console.log(err.message || err.data.message || err);
	  return Promise.reject(err.message || err);
	}

	private delay(ms: number) {
	    return new Promise(resolve => setTimeout(resolve, ms));
	}
}