import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ForumMessage } from '../interfaces/forummessage.interface';

const baseUrl = "http://localhost:9090/api/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  /**
   * Creates a new user object in the database.
   * @param data Details of the User
   * @returns The newly created User object
   */
  registerUser(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data);
  }

  /**
   * Adds a new notification to the specified user.
   * @param id Username to send the notification to
   * @param data Details of the notification
   * @returns Updated User object
   */
  sendNotification(id:string, data:ForumMessage): Observable<any> {
    return this.http.put(`${baseUrl}/msg/${id}`, data);
  }

  /**
   * Gets the details of a user.
   * @param id Username to query
   * @returns The User object mapped to the username
   */
  getUser(id:string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  /**
   * Gets a list of every user created. Mostly used for the members page.
   * @returns Array of Users
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}`);
  }

  /**
   * Gets User details based on login information. Used when dealing
   * with password hashing.
   * @param username Username of the user
   * @param password An Unhashed string to compare to the one in the database
   * @returns User object associated with the username if everything passes
   */
  getUserFromLogin(username:string, password:string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/login/${username}/${password}`);
  }

  /**
   * Updates a user's details in the database.
   * @param userid Username of the user
   * @param properties New user object to change it to
   * @returns Updated User object
   */
  updateUserDetails(userid:string, properties:User): Observable<any> {
    return this.http.put(`${baseUrl}/${userid}`, properties);
  }
  
}
