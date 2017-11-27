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

	constructor(private http:Http) {
		this.getBlogs();
	}

	getBlogs(): Promise<Blog[]> {
		if (this.blogs != null)
			return Promise.resolve(this.blogs);

		let url = `${this.BASE_URL}/blogs`;
		return this.http.get(url,{headers:this.headers})
				.toPromise()
				.then(res => this.blogs = res.json().blogs as Blog[])
				.catch(this.handleError);
	}

	getBlog(id:number,cnt?:number):Promise<Blog>{
		if (cnt)
			return Promise.reject(null);
		if (this.blogs != null)
			return Promise.resolve(this.blogs.filter(b => b.id === id)[0]);
		else{
			return this.delay(2000)
				.then(v => this.getBlog(id,1));
		}
	}

	newPost(blog:Blog):Promise<Blog>{
		let url = `${this.BASE_URL}/newPost`;
		return this.http.post(url,blog,{headers:this.headers})
						.toPromise()
						.then(res => {
							let blg:Blog = res.json().data as Blog;
							this.blogs.push(blg);
							return blg.id;
						})
						.catch(this.handleError);
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

	private delay(ms: number) {
	    return new Promise(resolve => setTimeout(resolve, ms));
	}
}
