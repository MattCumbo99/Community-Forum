import { ForumSubject } from "./forumsubject.interface";

export interface ForumSubcategory {
    name:string;
    description:string;
    subjects:Array<ForumSubject>;
    posts:Array<string>;
}