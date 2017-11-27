import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogComponent } from './components/blog/blog.component';
import { ValidGuard } from './guard/valid.guard';
import { LoginGuard } from './guard/loginRedirect.gaurd';
import { AuthorComponent } from './components/author/author.component';
import { NewPostComponent } from './components/new-post/new-post.component';


const routes: Routes = [
	{ 
		path:'dashboard',
		component:DashboardComponent,
		canActivate:[ValidGuard]
	},
	{ 
		path:'register', 
		component:RegisterComponent,
		canActivate: [LoginGuard]
	},
	{ 
		path:'login',
		component:LoginComponent,
		canActivate : [LoginGuard]
	},
	{
		path:'newPost',
		component:NewPostComponent,
		canActivate:[ValidGuard]
	},
	{ 
		path:'blogs',
		component:BlogsComponent,
	},
	{
		path:'blogs/:blog',
		component:BlogComponent
	},
	{
		path:':author',
		component:AuthorComponent
	},
	{ path:'', redirectTo: 'blogs',pathMatch:'full'}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}