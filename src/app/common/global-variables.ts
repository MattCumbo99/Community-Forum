import { Injectable } from "@angular/core";
import { User } from "../backend/interfaces/user.interface";

@Injectable()
export class GlobalVariables {
    // Title of the website
    public websiteTitle:string = "Community Forum";
    // No pfp (default url)
    public basicPfpUrl = "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";

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
        pfpUrl:this.basicPfpUrl,
        email:"",
        privilege:0,
        dateCreated:new Date(),
    };

    // Date to be given permanent bans as
    public permaDate = new Date(2200, 31, 12);

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

    // Used for grabbing the logged in user via cookies
    private loginVar:string = 'forum_login';

    // Grabs the username of the currently logged in user
    public getCurrentUserDetails(): string {
        const logger = window.localStorage.getItem(this.loginVar);
        const logger2 = window.sessionStorage.getItem(this.loginVar);

        // Attempt to figure out if the user is already logged in
        if (typeof logger==='string') {
            return logger.toString();
        }
        else if (typeof logger2==='string') {
            return logger2.toString();
        }
        // User is not logged in
        return "";
    }
    
    // Logout button function
    public logoutUser(): void {
        window.localStorage.removeItem(this.loginVar);
        window.sessionStorage.removeItem(this.loginVar);
        location.reload();
    }
}
