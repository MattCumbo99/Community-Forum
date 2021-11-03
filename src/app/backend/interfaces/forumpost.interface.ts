import { ForumComment } from "./forumcomment.interface";

export interface ForumPost {
    postId:number;
    title:string;
    author:string;
    content:string;
    isArchived:boolean;
    datePosted:Date;
    comments:Array<ForumComment>; 
}
