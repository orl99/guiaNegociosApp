import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { Categories } from 'src/app/models/categories.interface';
import { Post } from '../models/post.interface';
import { Tag } from '../models/tags.interface';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WordpressApiService {

  baseApiEndpoint = 'https://guiaparanegocios.net/wp-json/wp/v2/';
  customApiEndpoint = 'https://guiaparanegocios.net/wp-json/custom_api/v1/';

  constructor(private http$: HttpClient, private loadingController: LoadingController) { }

  /**
   * getCategories
   */
  public async getCategories(): Promise<Categories[]> {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    // Code goes here
    const res = await this.http$.get<Categories[]>(`${this.customApiEndpoint}categories`).toPromise();
    await loader.dismiss();
    return res;
  }

  public async getPostsByCat(cat: number) {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    const res = await this.http$.get<Post[]>(`${this.customApiEndpoint}posts/${cat}`).toPromise();
    await loader.dismiss();
    return res;
  }

  public async getPost(postID: number) {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    const res = await this.http$.get<Post>(`${this.customApiEndpoint}post/${postID}`).toPromise();
    await loader.dismiss();
    return res;
  }

  public async getTags() {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    const res = await this.http$.get<Tag[]>(`${this.customApiEndpoint}tags`).toPromise();
    await loader.dismiss();
    return res;
  }
}
