import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForumPost } from '../interfaces/forumpost.interface';

const baseUrl = "http://localhost:9090/api/posts";

@Injectable({
  providedIn: 'root'
})
export class ForumpostService {

  constructor(private http:HttpClient) { }

  /**
   * Adds a comment object to an existing post.
   * @param id The postId of the post to add the comment to
   * @param data Content of the comment
   * @returns The updated forum post
   */
  addComment(id:number, data:{content:string, username:string}): Observable<any> {
    return this.http.put(`${baseUrl}/comment/${id}`, data);
  }

  /**
   * Gets a post from the database as a ForumPost object.
   * @param id The postId of the desired post
   * @returns ForumPost corresponding to the postId
   */
  getPost(id:number): Observable<ForumPost> {
    return this.http.get<ForumPost>(`${baseUrl}/${id}`);
  }
}
