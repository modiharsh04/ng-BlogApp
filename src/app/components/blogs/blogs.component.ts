import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';

@Pipe({name: 'safeStyle'})
export class Safe {
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
	blogs:Blog[] = new Array();
  private err:string = "";

  constructor(private blogService:BlogsService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(){
    this.err = "";
    this.blogService.getBlogs()
            .then((blogs) => {
              blogs.forEach(blg =>{
                let b:Blog = {};
                b.content = blg.content;
                b.author = blg.author;
                b.id = blg.id;
                b.last_modified = blg.last_modified;
                b.subject = blg.subject;
                if (b.content.length >295)
                  b.content = b.content.substring(0,295).concat('.....');
                this.blogs.push(b);
              })
            })
            .catch(err => {
              this.err = "Can not connect to server at the moment!"
            });
  }

}
