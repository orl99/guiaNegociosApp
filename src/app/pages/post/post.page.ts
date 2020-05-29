import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';

// AdMob ionic plugs
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from '@rdlabo/capacitor-admob';
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

  // AdMob Options for single post in android platform
  private AdMobOptions: AdOptions = {
    adId: 'ca-app-pub-8693507653531046/2767139387',
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: true
  };
  constructor(private route: ActivatedRoute,
              private wpService: WordpressApiService) {
    route.params.subscribe(params => this.postId = params['postId']);

    // AdMob config init
    // AdMob.showBanner(this.AdMobOptions);
    // AdMob.addListener('onAdLoaded', () => {
    //   console.log('AdMob banner loaded');
    // });
    // AdMob.addListener('onAdSize', (info: boolean) => {
    //   console.log('AdMob size', info);
    // });
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
