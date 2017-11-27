import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  blog:Blog = new Object();
  constructor(private loc:Location,
              private router:Router,
              private blogservice:BlogsService) { }

  ngOnInit() {
    var author = JSON.parse(localStorage.getItem('loggedUser'));
    this.blog.author = author;
  }

  newPost(){
    this.blog.content = this.blog.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
  	this.blogservice.newPost(this.blog)
                    .then(blog => this.router.navigate(['/blogs',blog]))
                    .catch(err => console.log(err));
  }

  goBack(){
    this.loc.back();
  }

}
