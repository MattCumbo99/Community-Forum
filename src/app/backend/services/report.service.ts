import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumReport } from '../interfaces/forumreport.interface';

const baseUrl = "http://localhost:9090/api/reports";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  /**
   * Creates a new report to the database.
   * @param data Details of the report object to create
   * @returns The report object
   */
  create(data:{reportId:number, sender:string, user:string, reason:string, details:string}): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

  /**
   * Retrieves a list of every report created.
   * @returns Array of all reports as ForumReport objects
   */
  getAll(): Observable<ForumReport[]> {
    return this.http.get<ForumReport[]>(`${baseUrl}`);
  }

  /**
   * Updates a report's status.
   * @param id The reportId of the object
   * @param status The new status to change it to
   * @returns The new report object
   */
  updateReportStatus(id:number, status:number): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, status);
  }
}
