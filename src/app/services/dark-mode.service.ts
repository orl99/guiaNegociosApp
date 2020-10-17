import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  // tslint:disable-next-line: no-inferrable-types
  private darkMode: boolean = false;

  constructor( private storage: Storage ) {}

  async getDarkModeStatus() {
    this.darkMode = await this.storage.get('darkMode') || false;
    return this.darkMode;
  }

  async setDarkMode( darkMode: boolean) {
    this.darkMode = darkMode;
    await this.storage.set('darkMode', darkMode) ;
  }

}



