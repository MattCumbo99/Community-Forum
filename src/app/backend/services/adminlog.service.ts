import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminLog } from '../interfaces/adminlog.interface';

const baseUrl = "http://localhost:9090/api/adminlogs";

@Injectable({
  providedIn: 'root'
})
export class AdminlogService {

  constructor(private http:HttpClient) { }

  /**
   * Logs an action to the database.
   * @param data Details of the action
   * @returns The newly created logged action
   */
  logAction(data:{user:string, details:string}): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

  /**
   * Gets every logged action in the database.
   * @returns Array of AdminLog objects present in the database
   */
  retrieveAll(): Observable<AdminLog[]> {
    return this.http.get<AdminLog[]>(`${baseUrl}`);
  }

  /**
   * Gets a list of logs associated with a user.
   * @param id Username to query
   * @returns Array of AdminLog objects associated with the username
   */
  retrieveLogsByUser(id:string): Observable<AdminLog[]> {
    return this.http.get<AdminLog[]>(`${baseUrl}/${id}`);
  }
}
