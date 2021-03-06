import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForumCategory } from '../interfaces/forumcategory.interface';

const baseUrl = "http://localhost:9090/api/forums";

@Injectable({
  providedIn: 'root'
})
export class ForumsService {

  constructor(private http:HttpClient) { }

  /**
   * Creates a new category to the database.
   * @param data Content of the category
   * @returns Newly created category
   */
  createCategory(data:{name:string, description:string}): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

  /**
   * Adds a subcategory to a category.
   * @param category The name of the category to add onto
   * @param data Content of the subcategory
   * @returns The updated category
   */
  addSubcategory(category:string, data:{name:string, description:string, minPostPrivilege:number}): Observable<any> {
    return this.http.put(`${baseUrl}/${category}`, data);
  }

  /**
   * Adds a subject to a subcategory.
   * @param category Name of the category containing the subcategory
   * @param subCategory Name of the subcategory
   * @param data Content of the subject
   * @returns The updated category
   */
  addSubject(category:string, subCategory:string, data:{name:string, description:string}): Observable<any> {
    return this.http.put(`${baseUrl}/${category}/${subCategory}`, data);
  }

  /**
   * Gets a list of ForumCategory objects created in the database.
   * @returns Array containing every category and their contents from the database
   */
  getAllCategories(): Observable<ForumCategory[]> {
    return this.http.get<ForumCategory[]>(`${baseUrl}`);
  }

  /**
   * Gets a single category from the database.
   * @param name The name of the category
   * @returns ForumCategory object associated with the category name
   */
  getCategory(name:string): Observable<ForumCategory> {
    return this.http.get<ForumCategory>(`${baseUrl}/${name}`);
  }

  /**
   * Gets the category from the database that contains the subcategory.
   * @param name Name of the subcategory
   * @returns ForumCategory that contains the subcategory
   */
  getCategoryBySubcategory(name:string): Observable<ForumCategory> {
    return this.http.get<ForumCategory>(`${baseUrl}/subcategory/${name}`);
  }

  /**
   * Creates a ForumPost object to its database along with categorizing 
   * it into a category's subcategory.
   * @param category Name of the category
   * @param subcategory Name of the subcategory under the category param
   * @param data Content of the ForumPost
   * @returns Updated forum category
   */
  addPostToSubcategory(category:string, subcategory:string, data:{postId:number}): Observable<any> {
    return this.http.put(`${baseUrl}/post/${category}/${subcategory}`, data);
  }
}
