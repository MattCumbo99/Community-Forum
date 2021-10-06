import { Injectable } from "@angular/core";
import { User } from "../backend/interfaces/user.interface";

@Injectable()
export class GlobalVariables {
    // Title of the website
    public websiteTitle:string = "Community Forum";

    // List of roles
    public userRoles:Array<{id:number, name:string}> = [
        {id:0, name:"Guest"},
        {id:1, name:"Member"},
        {id:253, name:"Moderator"},
        {id:254, name:"Administrator"},
        {id:255, name:"Head Administrator"}
    ];

    // Default guest user
    public defaultUser:User = {
        username:"",
        password:"",
        birthday:new Date("Jan 1, 1970"),
        email:"",
        privilege:0,
        dateCreated:new Date(),
        signature:"",
        location:"",
        posts:[],
        comments:[]
    };
}
