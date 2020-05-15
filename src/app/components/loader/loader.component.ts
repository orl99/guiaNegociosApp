import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {

  private stateSubscription: Subscription;
  diss: any;


  constructor(private loaderCtrl: LoadingController, private loaderService: LoaderService) {
    console.log('dewd');

  }

  async ngOnInit() {
    this.diss = await this.loaderCtrl.create({
      message: 'Loading...'
    });


    this.stateSubscription = this.loaderService.loaderState
      .subscribe( async (state) => {
        console.log('interceptor x', state);
        if (state.show) {
          await this.diss.present();
        } else {
          await this.diss.dismiss();
        }
      });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

}
