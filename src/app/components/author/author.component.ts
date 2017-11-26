import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';

import { BlogsService } from '../../services/blogs.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  author:User;
  constructor(private blogservices:BlogsService,private route:ActivatedRoute) { }

  ngOnInit() {
  	this.route.params
  			.subscribe(params =>{
            this.blogservices.getUser(params['author'])
                .then(author => this.author = author)
                .catch(err => console.log(err))
          });
  	
  }

}
