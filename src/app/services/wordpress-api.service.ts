import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { Categories } from 'src/app/models/categories.interface';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class WordpressApiService {

  baseApiEndpoint = 'https://guiaparanegocios.net/wp-json/wp/v2/';

  constructor(private http$: HttpClient) { }

  /**
   * getCategories
   */
  public async getCategories(): Promise<Categories[]> {
    // Code goes here
    const res = await this.http$.get<Categories[]>(`${this.baseApiEndpoint}categories`).toPromise();
    return res;
  }

  public async getPostsByCat(cat: number) {
    const res = await this.http$.get<Post[]>(`${this.baseApiEndpoint}posts?_embed&categories=${cat}`).toPromise();
    return res;
  }
}
