export interface Ban {
    username:string;
    reason:string;
    lengthText:string;
    author:string;
    expiryDate:Date;
    unbanned?:boolean;
    unbanReason?:string;
    unbanAuthor?:string;
}