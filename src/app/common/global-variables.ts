import { Injectable } from "@angular/core";

@Injectable()
export class GlobalVariables {
    // Title of the website
    public websiteTitle:string = "Community Forum";
    // List of roles
    public userRoles:Array<{id:number, name:string}> = [
        {id:0, name:"Guest"},
        {id:1, name:"Member"},
        {id:253, name:"Moderator"},
        {id:254, name:"Admin"},
        {id:255, name:"Head Administrator"}
    ];
}
