import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Interceptor
import { HttpLoaderInterceptor } from 'src/app/services/interceptors/httpLoaderInterceptor.interceptor';

// Modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Storage
import { IonicStorageModule } from '@ionic/storage';


// NGXS
// import { NgxsModule } from '@ngxs/store';
// import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
// import { NameState } from './path/name.state';

import { HTTP } from '@ionic-native/http/ngx';

import { Facebook } from '@ionic-native/facebook/ngx';

// ngrx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    // NgxsModule.forRoot([
    //   // NameState
    // ]),
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot()

    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoaderInterceptor,
      multi: true
    },
    HTTP,
    AppVersion,
    Facebook
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
