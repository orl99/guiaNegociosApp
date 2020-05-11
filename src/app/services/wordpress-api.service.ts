import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { Categories } from 'src/app/models/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class WordpressApiService {

  baseApiEndpoint = 'https://guiaparanegocios.net/wp-json/wp/v2/';

  constructor(private http$: HttpClient) { }

  /**
   * getCategories
   */
  public async getCategories(): Categories[] {
    // Code goes here
    const res = await this.http$.get<Categories[]>(`${this.baseApiEndpoint}categories`).toPromise();
    return res;
  }
  // public getCategories(): Observable<Categories[]> {
  //   // Code goes here
  //   return this.http$.get<Categories[]>(`${this.baseApiEndpoint}categories`);
  // }
}
