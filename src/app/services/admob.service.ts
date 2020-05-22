import { Injectable } from '@angular/core';
// Platform
import { Platform } from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  // Config objects
  adMobBannerConfgObj: AdMobFreeBannerConfig = {
    id: 'ca-app-pub-8693507653531046/2409629315',
    isTesting: true, // KEEP DURING CODING, REMOVE AT PROD.
    autoShow: true,
  };

  constructor(private adMobFree: AdMobFree, private plat: Platform) {
    plat.ready().then(() => {
      this.adMobFree.banner.config(this.adMobBannerConfgObj);
    });
  }

  public showBanner() {
    this.adMobFree.banner.prepare()
      .then(() => {
        console.log('Banner loaded');
      })
      .catch((e) => {
        console.log('PROBLEM LOADING BANNER: ', e);
      });
  }
}
