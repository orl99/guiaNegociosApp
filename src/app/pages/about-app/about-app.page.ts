import { DarkModeService } from '../../services/dark-mode.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { setPage } from '../../store/actions/menu.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit, OnDestroy {

  public darkMode;
  darkmodeSubs: Subscription;

  constructor( private darkModeService: DarkModeService,
               private store: Store<AppState> ) { }


  ngOnDestroy() {
    if (this.darkmodeSubs ) {
      this.darkmodeSubs.unsubscribe();
    }
  }

  async ngOnInit() {
    this.darkMode = await this.darkModeService.getDarkModeStatus();
    // console.log(this.darkMode);
    this.store.dispatch( setPage({ page: 'Sobre la app'}) );
    this.darkmodeSubs = this.store.select('darkMode').subscribe( ({darkMode}) => {
      // console.log('DarkMode Status: ', darkMode );
      this.darkMode = darkMode;
    });

  }

}
