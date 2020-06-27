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


// NGXS
// import { NgxsModule } from '@ngxs/store';
// import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
// import { NameState } from './path/name.state';

import { HTTP } from '@ionic-native/http/ngx';

import { Facebook } from '@ionic-native/facebook/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    // NgxsModule.forRoot([
    //   // NameState
    // ]),
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot()
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
