import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, AfterViewInit {
  postId: number;
  mainImage: string;
  postHTML: string;
  constructor(private route: ActivatedRoute,
              private wpService: WordpressApiService) {
    route.params.subscribe(params => this.postId = params['postId']);
  }

  async ngOnInit() {
    const response = await this.wpService.getPost(this.postId);
    console.log('Response', response);
    this.mainImage = response[0].featured_image_urls.medium_large;
    this.postHTML = response[0].content.rendered;
  }

  ngAfterViewInit() {
    // Csstom css
    setTimeout(() => {
      // TODO: Test this hack
      const imgs = document.getElementsByTagName('img');
      console.log('img', imgs);
      console.log('img', Array.from(imgs));
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < imgs.length; i++) {
        const element = imgs[i];
        element.style.height = 'auto';
      }
    }, 1000);
  }

}
