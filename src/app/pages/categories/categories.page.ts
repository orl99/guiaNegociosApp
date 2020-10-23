import { Component, OnInit, OnDestroy } from '@angular/core';

import { WordpressApiService } from 'src/app/services/wordpress-api.service';
import { Categories } from 'src/app/models/categories.interface';
import { Router } from '@angular/router';


// AdMob ionic plugs
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from "capacitor-admob";


// ionic
import { Platform } from '@ionic/angular';
const { AdMob } = Plugins;

// Envs
import { environment } from 'src/environments/environment';

// Posts Favoritos
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {
  categories: Categories[];
  // AdMob Options for categories for Android
  private AdMobOptionsAndroid: AdOptions = {
    adId: 'ca-app-pub-8693507653531046/2409629315',
    adSize: AdSize.SMART_BANNER,
    position: AdPosition.BOTTOM_CENTER,
    isTesting: environment.adMobTesting,
  };
  // AdMob Options for categories for iOS
  private AdMobOptionsios: AdOptions = {
    adId: 'ca-app-pub-8693507653531046/5972483697',
    adSize: AdSize.SMART_BANNER,
    position: AdPosition.BOTTOM_CENTER,
    isTesting: environment.adMobTesting,
  };

  constructor(
      private wpService: WordpressApiService,
      private router: Router,
      private plt: Platform,
      private favService: FavoritosService,
      ) {
      if (plt.is('hybrid') && plt.is("android")) {
        AdMob.showBanner(this.AdMobOptionsAndroid);
        AdMob.addListener('onAdLoaded', () => {
          console.log('AdMob banner loaded in Android');
        });
        AdMob.addListener('onAdSize', (info: boolean) => {
          console.log('AdMob size', info);
        });
      }
      if (plt.is('hybrid') && plt.is("ios")) {
        AdMob.showBanner(this.AdMobOptionsios);
        AdMob.addListener('onAdLoaded', () => {
          console.log('AdMob banner loaded in iOS');
        });
        AdMob.addListener('onAdSize', (info: boolean) => {
          console.log('AdMob size', info);
        });
      }

      // this.favService.cargarFavoritos();
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    console.log('[categorias] onDestroy')
  }

  async ngOnInit() {
    const res = await this.wpService.getCategories();
    console.log('res', res);
    this.categories = res;
  }

  public goPostsByCat(catId: number) {
    this.router.navigate(['categories/posts/', catId]);
  }

  public closeBannerAd() {
    AdMob.hideBanner()
      .then(
        val => {
          console.log('val', val);
        },
        error => {
          console.log('error', error);
        }
      );
  }

  /**
   * resumeBanner
   */
  public resumeBanner() {
    AdMob.resumeBanner()
    .then(
      val => {
        console.log('val', val);
      },
      error => {
        console.log('error', error);
      }
    );
  }
}
