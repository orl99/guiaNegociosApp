import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';

// AdMob ionic plugs
import { Plugins } from '@capacitor/core';

const { AdMob } = Plugins;

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  postId: number;
  mainImage: string;
  postHTML: string;
  postTitle: string;
  constructor(private route: ActivatedRoute,
              private wpService: WordpressApiService) {
    route.params.subscribe(params => this.postId = params['postId']);
  }

  async ngOnInit() {
    const response = await this.wpService.getPost(this.postId);
    console.log('Response', response);
    this.mainImage = response.featured_image.large;
    this.postTitle = response.title;
    this.postHTML = response.content;
    this.stylePostTags();
    console.log(response.featured_image);
  }

  stylePostTags() {
    // Custom css
    setTimeout(() => {
      // TODO: Test this hack
      const imgs = document.getElementsByTagName('img');
      const preEles = document.getElementsByTagName('pre');
      Array.from(imgs).forEach(el => {
        el.style.height = 'auto';
      });
      Array.from(preEles).forEach(el => {
        el.style.whiteSpace = 'pre-wrap';
        el.style.fontSize = '12.5px';
      });
    }, 100);
  }

}
