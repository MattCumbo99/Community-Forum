import { ForumSubject } from "./forumsubject.interface";

export interface ForumSubcategory {
    name:string;
    description:string;
    minPostPrivilege:number;
    subjects:Array<ForumSubject>;
    posts:Array<string>;
}