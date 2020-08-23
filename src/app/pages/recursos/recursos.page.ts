import { Component, OnInit } from '@angular/core';

// services http
import { WordpressApiService } from 'src/app/services/wordpress-api.service';
import { Router } from '@angular/router';

// Models
import { BasePostEmbeb } from 'src/app/models/post.interface';
@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.page.html',
  styleUrls: ['./recursos.page.scss'],
})
export class RecursosPage implements OnInit {

  pageNum = 1;
  allPosts: BasePostEmbeb[];
  infinityLoadingFlag = true;
  // pageFilterModeFlag = false;
  initialPostsLenght: number;

  constructor(private wpservce: WordpressApiService,
              private router: Router) { }

  async ngOnInit() {
    const response = await this.wpservce.getCustomPostType('recursos', this.pageNum);
    console.log('res', response);
    this.allPosts = response;
    if (response.length < 10) {
      console.log('Infinity scroll disabled');
      this.infinityLoadingFlag = false;
    }
  }

  public goPost(catId: number) {
    this.router.navigate(['categories/post/', catId]);
  }

  public async loadMorePost($event: any) {
    this.pageNum ++;
    const response = await this.wpservce.getCustomPostType('recursos', this.pageNum);
    console.log('res', response);
    if (response.length) {
      console.log('More loaded post', response);
      const post = [...this.allPosts];
      this.allPosts = [...post, ...response];
      console.log('all post', this.allPosts);
      $event.target.complete();
    }
    if (response.length < 10) {
      console.log('Infinity loading cancel');
      $event.target.disabled = true;
    }
  }

}
