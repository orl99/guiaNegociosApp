import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
// Loading component
import { LoaderService } from '../loader.service';
import { tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class HttpLoaderInterceptor implements HttpInterceptor {
    loaderCtrlObj: HTMLIonLoadingElement;
    constructor(private loaderService: LoaderService, private loadingController: LoadingController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // await this.showLoader();
        console.log('ínterceptor');
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // this.hideLoader();
            }
            return event;
        },
        (error: any) => {
            this.hideLoader();
        }
        ));
    }

    private async showLoader() {
        this.loaderCtrlObj = await this.loadingController.create({
            message: '...',
        });
        await this.loaderCtrlObj.present();

        // this.loaderService.showLoader();
    }

    private async hideLoader() {
        await this.loaderCtrlObj.dismiss();
        // await this.loaderCtrlObj.present();
        // this.loaderService.hideLoader();
    }
}
