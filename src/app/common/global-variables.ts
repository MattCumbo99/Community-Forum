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
        {id:254, name:"Admin"},
        {id:255, name:"Head Admin"},
        {id:256, name:"Owner"}
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

    // =================
    // METHODS
    // =================

    // Returns the name of a role based on its id
    public getRoleName(roleId:number): string {
        // Get the corresponding role
        const result = this.userRoles.find( ({ id }) => id == roleId);
        if (result != null)
            return result.name;
        else
            return "Invalid";
    }
}
