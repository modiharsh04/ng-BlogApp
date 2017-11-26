import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AuthModule } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service'
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ValidGuard } from './guard/valid.guard'
import { LoginGuard } from './guard/loginRedirect.gaurd';
import { HeaderComponent } from './components/header/header.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogsService } from './services/blogs.service';
import { FooterComponent } from './components/footer/footer.component';
import { BlogComponent } from './components/blog/blog.component';
import { AuthorComponent } from './components/author/author.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    BlogsComponent,
    FooterComponent,
    BlogComponent,
    AuthorComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AuthModule
  ],
  providers: [
    AuthService,
    ValidGuard,
    LoginGuard,
    BlogsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }