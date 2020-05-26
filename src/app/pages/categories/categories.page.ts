import { Component, OnInit } from '@angular/core';

import { WordpressApiService } from 'src/app/services/wordpress-api.service';
import { Categories } from 'src/app/models/categories.interface';
import { Router } from '@angular/router';


// AdMob ionic plugs
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from '@rdlabo/capacitor-admob';
const { AdMob } = Plugins;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Categories[];
  // AdMob Options
  private AdMobOptions: AdOptions = {
    adId: 'ca-app-pub-8693507653531046/2409629315',
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: true
  };

  constructor( private wpService: WordpressApiService,
               private router: Router) {
                AdMob.showBanner(this.AdMobOptions);
                AdMob.addListener('onAdLoaded', () => {
                  console.log('AdMob banner loaded');
                });
                AdMob.addListener('onAdSize', (info: boolean) => {
                  console.log('AdMob size', info);
                });
  }

  async ngOnInit() {
    const res = await this.wpService.getCategories();
    console.log('res', res);
    this.categories = res;
  }

  goPostsByCat(catId: number) {
    this.router.navigate(['categories/posts/', catId]);
  }

}
