import { User } from './user';

export interface Blog {
  	id?:number,
  	content?:string, 
  	subject?: string, 
  	created?: string, 
  	last_modified?:string,
  	author?: User
}