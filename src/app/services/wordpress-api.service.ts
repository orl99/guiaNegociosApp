import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { Categories } from 'src/app/models/categories.interface';
import { Post } from '../models/post.interface';
import { Tag } from '../models/tags.interface';
import { LoadingController, Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class WordpressApiService {

  baseApiEndpoint = 'https://guiaparanegocios.net/wp-json/wp/v2/';
  customApiEndpoint = 'https://guiaparanegocios.net/wp-json/custom_api/v1/';

  constructor(private http$: HttpClient, 
              private loadingController: LoadingController,
              private nativeHttp: HTTP,
              private plt: Platform) { }

  /**
   * getCategories
   */
  public async getCategories(): Promise<Categories[]> {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    if (this.plt.is('ios')) {
      console.log('IOS ON')
      const res = await this.nativeHttp.get(`${this.customApiEndpoint}categories`, {}, {});
      const jsonRes = JSON.parse(res.data);
      await loader.dismiss();
      console.log('json', jsonRes);
      return jsonRes;
    } else {
      // Code goes here
      const res = await this.http$.get<Categories[]>(`${this.customApiEndpoint}categories`).toPromise();
      await loader.dismiss();
      return res;
    }
  }

  public async getPostsByCat(cat: number): Promise<Post[]> {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    if (this.plt.is('ios')) {
      const res = await this.nativeHttp.get(`${this.customApiEndpoint}posts/${cat}`, {}, {});
      const jsonRes = JSON.parse(res.data);
      await loader.dismiss();
      console.log('json', jsonRes);
      return jsonRes;
    } else {
      const res = await this.http$.get<Post[]>(`${this.customApiEndpoint}posts/${cat}`).toPromise();
      await loader.dismiss();
      return res;
    }
  }

  public async getPost(postID: number): Promise<Post> {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    if (this.plt.is('ios')) {
      const res = await this.nativeHttp.get(`${this.customApiEndpoint}post/${postID}`, {}, {});
      const jsonRes = JSON.parse(res.data);
      await loader.dismiss();
      console.log('json', jsonRes);
      return jsonRes;
    } else {
      const res = await this.http$.get<Post>(`${this.customApiEndpoint}post/${postID}`).toPromise();
      await loader.dismiss();
      return res;
    }
  }

  public async getTags(): Promise<Tag[]> {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    if (this.plt.is('ios')) {
      const res = await this.nativeHttp.get(`${this.customApiEndpoint}tags`, {}, {});
      const jsonRes = JSON.parse(res.data);
      await loader.dismiss();
      console.log('json', jsonRes);
      return jsonRes;
    }
    const res = await this.http$.get<Tag[]>(`${this.customApiEndpoint}tags`).toPromise();
    await loader.dismiss();
    return res;
  }
}
