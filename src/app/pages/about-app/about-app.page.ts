import { DarkModeService } from '../../services/dark-mode.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit {

  public darkMode;

  constructor(private darkModeService: DarkModeService ) { }

  async ngOnInit() {
    this.darkMode = await this.darkModeService.getDarkModeStatus();
    console.log(this.darkMode);
  }

}
