import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ban } from '../interfaces/ban.interface';

const baseUrl = "http://localhost:9090/api/bans";

@Injectable({
  providedIn: 'root'
})
export class BanService {

  constructor(private http:HttpClient) { }

  /**
   * Adds a new ban to the database.
   * @param details The Ban object to add
   * @returns The newly created Ban object
   */
  addBan(details:Ban): Observable<any> {
    return this.http.post(`${baseUrl}`, details);
  }

  /**
   * Grabs the user's most recent ban.
   * @param id Username to search with
   * @returns The user's most recent Ban object
   */
  getUsersBan(id:string): Observable<Ban> {
    return this.http.get<Ban>(`${baseUrl}/${id}`);
  }

  /**
   * Gets a list of all the Ban objects from the database.
   * Bans are sorted in descending order from the date they were 
   * created at.
   * @returns Array of Ban objects from the database
   */
  getAllBans(): Observable<Ban[]> {
    return this.http.get<Ban[]>(`${baseUrl}`);
  }

  /**
   * Updates a user's ban details.
   * @param id Username of the desired Ban to update
   * @param details The replacement Ban object
   * @returns The updated Ban object from the database
   */
  updateBanByUser(id:string, details:Ban): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, details);
  }
}
