export interface Ban {
    username:string;
    reason:string;
    lengthText:string;
    author:string;
    expiryDate:Date;
    createdAt:Date;
    unbanned?:boolean;
    unbanReason?:string;
    unbanAuthor?:string;
}