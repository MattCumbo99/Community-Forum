import { ForumComment } from "./forumcomment.interface";
import { ForumPost } from "./forumpost.interface";

export interface User {
    username:string;
    password:string;
    privilege:number;
    email:string;
    dateCreated:Date;
    birthday:Date;
    signature:string;
    location:string;
    posts:Array<ForumPost>;
    comments:Array<ForumComment>;
}
