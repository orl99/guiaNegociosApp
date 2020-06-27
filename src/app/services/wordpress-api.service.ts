/**
 * Created by Orlando Garcia
 * Mio Agency Dev Team
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Models
import { Categories } from 'src/app/models/categories.interface';
import { Post, OldPost } from '../models/post.interface';
import { Tag, LiteTag } from '../models/tags.interface';
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
    if (this.plt.is('ios') && this.plt.is('hybrid')) {
      console.log('IOS ON');
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

  public async getPostsByCat(cat: number, pageNum: number): Promise<Post[]> {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    const apiUrl = `${this.customApiEndpoint}posts/${cat}/${pageNum}`;
    if (this.plt.is('ios') && this.plt.is('hybrid')) {
      const res = await this.nativeHttp.get(apiUrl, {}, {});
      const jsonRes = JSON.parse(res.data);
      await loader.dismiss();
      console.log('json', jsonRes);
      return jsonRes;
    } else {
      const res = await this.http$.get<Post[]>(apiUrl).toPromise();
      await loader.dismiss();
      return res;
    }
  }

  public async getPost(postID: number): Promise<Post> {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present();
    if (this.plt.is('ios') && this.plt.is('hybrid')) {
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
    await loader.present() ;
    const apiUrl = `${this.customApiEndpoint}tags`;
    if (this.plt.is('ios') && this.plt.is('hybrid')) {
      const res = await this.nativeHttp.get(apiUrl, {}, {});
      const jsonRes = JSON.parse(res.data);
      await loader.dismiss();
      console.log('json', jsonRes);
      return jsonRes;
    }
    const res = await this.http$.get<Tag[]>(apiUrl).toPromise();
    await loader.dismiss();
    return res;
  }

  public async getTagsByCat(categoryId: number): Promise<LiteTag[]> {
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present() ;
    const apiUrl = `${this.customApiEndpoint}tags/${categoryId}`;
    if (this.plt.is('ios') && this.plt.is('hybrid')) {
      const res = await this.nativeHttp.get(apiUrl, {}, {});
      const jsonRes = JSON.parse(res.data);
      await loader.dismiss();
      console.log('json', jsonRes);
      return jsonRes;
    }
    const res = await this.http$.get<LiteTag[]>(apiUrl).toPromise();
    await loader.dismiss();
    return res;
  }

  public async getPostByCatAndTags(categoryId: number, tagId: number, pagNumber: number): Promise<Post[]> {
    // const posts&cat=16&tag=3&pag=1
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present() ;
    const apiUrl = `${this.customApiEndpoint}posts&cat=${categoryId}&tag=${tagId}&pag=${pagNumber}`;
    if (this.plt.is('ios') && this.plt.is('hybrid')) {
      const res = await this.nativeHttp.get(apiUrl, {}, {});
      const jsonRes = JSON.parse(res.data);
      await loader.dismiss();
      console.log('json', jsonRes);
      return jsonRes;
    }
    const res = await this.http$.get<Post[]>(apiUrl).toPromise();
    await loader.dismiss();
    return res;
  }

  /**
   * getCustomPostType()
   * This method is in charge of getting posts with a specific custom potst type
   * this method use pagination so it will get 10 by 10 posts and will depend in the page number that has pageNum
   * @param customPostType @string
   * @param pageNum @number (page number)
   * @returns Promise<OldPost[]>
   */
  public async getCustomPostType(customPostType: string, pageNum: number): Promise<OldPost[]> {
    // const posts&cat=16&tag=3&pag=1
    const loader = await this.loadingController.create({ message: 'loading...' });
    await loader.present() ;
    const apiUrl = `${this.baseApiEndpoint}${customPostType}?${pageNum}`;
    if (this.plt.is('ios') && this.plt.is('hybrid')) {
      const res = await this.nativeHttp.get(apiUrl, {}, {});
      const jsonRes = JSON.parse(res.data);
      await loader.dismiss();
      console.log('json', jsonRes);
      return jsonRes;
    }
    const res = await this.http$.get<OldPost[]>(apiUrl).toPromise();
    await loader.dismiss();
    return res;
  }
}
