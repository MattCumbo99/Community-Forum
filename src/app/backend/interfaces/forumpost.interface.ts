import { ForumComment } from "./forumcomment.interface";

export interface ForumPost {
    title:string;
    content:string;
    isArchived:boolean;
    datePosted:Date;
    comments:Array<ForumComment>; 
}
