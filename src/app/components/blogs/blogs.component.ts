import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';

@Pipe({name: 'safeStyle'})
export class Safe {
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    // return this.sanitizer.bypassSecurityTrustStyle(style);
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
	private blogs:Blog[];
  private err:string = "";

  constructor(private blogService:BlogsService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(){
    this.err = "";
    this.blogService.getBlogs()
            .then(blogs => this.blogs = blogs)
            .catch(err => {
              this.err = "Can not connect to server at the moment!"
            });
  }

}
