import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

const baseUrl = "http://localhost:9090/api/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // Creates a new user in the database
  registerUser(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data);
  }

  // Finds a user by their username
  getUser(id:string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  // Returns all of the users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}`);
  }

  // Checks for correct login information
  getUserFromLogin(username:string, password:string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/login/${username}/${password}`);
  }

  // Updates the user details
  updateUserDetails(userid:string, properties:{location?:string, signature?:string}): Observable<any> {
    return this.http.put(`${baseUrl}/${userid}`, properties);
  }
}
