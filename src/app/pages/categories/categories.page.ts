import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { WordpressApiService } from 'src/app/services/wordpress-api.service';
import { Categories } from 'src/app/models/categories.interface';
import { Router } from '@angular/router';


// AdMob ionic plugs
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from "capacitor-admob";


// ionic
import { IonInfiniteScroll, Platform } from '@ionic/angular';

const { AdMob } = Plugins;

// Envs
import { environment } from 'src/environments/environment';

// Posts Favoritos
import { FavoritosService } from '../../services/favoritos.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { setPage } from '../../store/actions/menu.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll, {static: false}) infitniteScroll: IonInfiniteScroll;


  categories: Categories[];
  categoriesToShow: Categories[];

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

  limitOfCategories: number = 8;
  infinityLoadingFlag: boolean = true;

  constructor(
      private wpService: WordpressApiService,
      private router: Router,
      private plt: Platform,
      private favService: FavoritosService,
      private store: Store<AppState>
      ) {
      if (plt.is('hybrid') && plt.is('android')) {
        AdMob.showBanner(this.AdMobOptionsAndroid);
        AdMob.addListener('onAdLoaded', () => {
          console.log('AdMob banner loaded in Android');
        });
        AdMob.addListener('onAdSize', (info: boolean) => {
          console.log('AdMob size', info);
        });
      }
      if (plt.is('hybrid') && plt.is('ios')) {
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
    // console.log('[categorias] onDestroy')
  }

  async ngOnInit() {
    this.store.dispatch( setPage({ page: 'Guias'}) );

    const res = await this.wpService.getCategories('categories');
    // console.log('res', res);
    this.categoriesToShow = res;
    this.categories = this.categoriesToShow.slice(0, this.limitOfCategories );

    if ( this.categories.length < this.limitOfCategories ) {
      this.infinityLoadingFlag = false;
    }
    else {
      this.infinityLoadingFlag = true;
    }

    
  }


  loadData( event ) {
    console.log('Cargando siguientes...');

    this.limitOfCategories += 8;
    this.categories = this.categoriesToShow.slice(0, this.limitOfCategories );
    
    if ( this.categories.length >= this.categoriesToShow.length ) {
      this.infinityLoadingFlag = false;
    }

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
