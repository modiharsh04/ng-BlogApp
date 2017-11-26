import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Blog } from '../models/blog';
import { User } from '../models/user';

@Injectable()
export class BlogsService {
	private BASE_URL: string = 'http://localhost:8000';
	private headers: Headers = new Headers({'Content-Type': 'application/json'});
	private blogs:Blog[];

	constructor(private http:Http) {}

	getBlogs(): Promise<Blog[]> {
		if (this.blogs != null)
			return Promise.resolve(this.blogs);

		let url = `${this.BASE_URL}/blogs`;
		return this.http.get(url,{headers:this.headers})
				.toPromise()
				.then(res => this.blogs = res.json().blogs as Blog[])
				.catch(this.handleError);
	}

	getBlog(id:number):Promise<Blog>{
		if (this.blogs != null)
			return Promise.resolve(this.blogs.filter(b => b.id === id)[0]);
		else{
			return this.getBlogs()
				.then(blgs => this.getBlog(id));
		}
	}

	getUser(username:string):Promise<User>{
		let url = `${this.BASE_URL}/${username}/`;
		return this.http.get(url,{headers : this.headers})
						.toPromise()
						.then(res => {
							if (res.json().status === 'success'){
								return res.json().data as User
							} else {throw Error(res.json().data)}
						})
		                .catch(this.handleError);
	}

	private handleError(err:any):Promise<any> {
	  return Promise.reject(err.message || err);
	}
}
