import { DarkModeService } from './services/dark-mode.service';
import { Component, OnInit, isDevMode } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Plugins } from '@capacitor/core';
const { AdMob } = Plugins;

import { AppVersion } from '@ionic-native/app-version/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FavoritosService } from './services/favoritos.service';

import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 1;
  public versionName: string;
  public page: string;

  public appPages = [
    {
      title: 'Guias',
      url: 'categories',
      icon: 'book'
    },
    {
      title: 'Recursos',
      url: 'recursos/categorias',
      icon: 'file-tray-stacked'
    },
    {
      title: 'Favoritos',
      url: 'favoritos',
      icon: 'star'
    },
    {
      title: 'Sobre la app',
      url: 'about-app',
      icon: 'information-circle'
    }
  ];

  // tslint:disable-next-line: no-inferrable-types
  darkMode: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appVersion: AppVersion,
    private FB: Facebook,
    private darkModeService: DarkModeService,
    private favService: FavoritosService,
    private store: Store<AppState>
  ) {
    this.initializeApp();
    AdMob.initialize('ca-app-pub-8693507653531046~7933897666');
    if (isDevMode()) {
      console.log('Welcome Developer, Dev Mode is On :D');
    } else {
      console.log('Welcome Client, Prob Mode is On :O');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('hybrid')) {
        this.getAppVersion();
      }
      this.FB.activateApp();
    });
  }

  async ngOnInit() {

    await this.darkModeService.loadDarkMode();
    this.darkMode = await this.darkModeService.getDarkModeStatus();

    this.store.select('page').subscribe( ({page}) => {
      console.log( 'Store Page State: ', page) ;
      this.page = page;
    });

    this.favService.cargarFavoritos();
  }

  async getAppVersion() {
    const versionNumber =  await this.appVersion.getVersionNumber();
    if (this.platform.is('ios')) {
      this.versionName = `${versionNumber} iOS`;
    }
    if (this.platform.is('android')) {
      this.versionName = `${versionNumber} Android`;
    }
    console.log('app version:', this.versionName);
  }

  cambioTheme() {
    this.darkMode = !this.darkMode;
    // console.log('dark Mode: ', this.darkMode );
    this.darkModeService.setDarkMode( this.darkMode );
  }

}
