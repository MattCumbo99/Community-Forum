import { ForumSubcategory } from "./forumsubcategory.interface";

export interface ForumCategory {
    name:string;
    description:string;
    subCategories:Array<ForumSubcategory>;
    posts:Array<string>;
}