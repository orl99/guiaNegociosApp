import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface loaderStateInt {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // Create state
  private loaderSubjetc = new Subject<loaderStateInt>();
  public  loaderState = this.loaderSubjetc.asObservable();

  constructor() { }

  showLoader() {
    this.loaderSubjetc.next({show: true} as loaderStateInt);
  }
  hideLoader() {
    this.loaderSubjetc.next({show: false} as loaderStateInt);
  }
}
