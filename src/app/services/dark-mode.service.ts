import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { setDarkMode } from '../store/actions/darkMode.action';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  // tslint:disable-next-line: no-inferrable-types
  private darkMode: boolean = false;

  constructor( private storage: Storage,
               private store: Store<AppState>
    ) { }

  async loadDarkMode() {
    const dark = await this.getDarkModeStatus();
    await this.setDarkMode( dark );
  }

  async getDarkModeStatus() {
    this.darkMode = await this.storage.get('darkMode') || false;
    return this.darkMode;
  }

  async setDarkMode( darkMode: boolean) {
    this.darkMode = darkMode;
    // console.log('setDarkMode: ', darkMode );

    this.store.dispatch( setDarkMode({ darkMode: this.darkMode}) );

    if ( this.darkMode ) {
      if ( !document.body.classList.contains('dark') ) {
        document.body.classList.add('dark');
      }
    } else {
      if ( document.body.classList.contains('dark') ) {
        document.body.classList.remove('dark');
      }
    }

    await this.storage.set('darkMode', darkMode) ;
  }

}



