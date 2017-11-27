import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';

import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blog:Blog;
  constructor(
  	private blogservice:BlogsService,
  	private route:ActivatedRoute
  	) { }

  ngOnInit() {
  	this.route.paramMap
  					.switchMap((params:ParamMap) => params.get('blog'))
  					.subscribe(id => 
  						this.blogservice.getBlog(+id)
							.then(blog => this.blog = blog)
              .catch(err => err)
					);

  }

}
