import { ForumComment } from "./forumcomment.interface";
import { ForumPost } from "./forumpost.interface";
import { ForumMessage } from "./message.interface";

export interface User {
    username:string;
    password:string;
    privilege:number;
    email:string;
    dateCreated:Date;
    pfpUrl:string;
    birthday:Date;
    messages?:Array<ForumMessage>;
    signature?:string;
    location?:string;
    profileComments?:Array<ForumComment>;
    posts?:Array<ForumPost>;
    comments?:Array<ForumComment>;
}
