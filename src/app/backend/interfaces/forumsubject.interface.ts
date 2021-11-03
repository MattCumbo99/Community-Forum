import { ForumPost } from './forumpost.interface';

export interface ForumSubject {
    name:string;
    description:string;
    posts:Array<ForumPost>;
}