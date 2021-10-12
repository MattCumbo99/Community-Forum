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

  // Adds a new ban to the database
  addBan(details:Ban): Observable<any> {
    return this.http.post(`${baseUrl}`, details);
  }

  // Grabs the user's most recent ban
  getUsersBan(id:string): Observable<Ban> {
    return this.http.get<Ban>(`${baseUrl}/${id}`);
  }

  // Gets all the bans
  getAllBans(): Observable<Ban[]> {
    return this.http.get<Ban[]>(`${baseUrl}`);
  }

  // Updates a user's ban
  updateBanByUser(id:string, details:Ban): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, details);
  }
}
