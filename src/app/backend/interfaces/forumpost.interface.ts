import { ForumComment } from "./forumcomment.interface";

export interface ForumPost {
    postId:number;
    title:string;
    author:string;
    content:string;
    isLocked:boolean;
    stickied:boolean;
    createdAt:Date;
    updatedAt:Date;
    comments:Array<ForumComment>; 
}
