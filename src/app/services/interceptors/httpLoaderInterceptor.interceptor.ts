import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
// Loading component
import { LoaderService } from '../loader.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpLoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.showLoader();
        console.log('ínterceptor');
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.hideLoader();
            }
        },
        (error: any) => {
            this.hideLoader();
        }
        ));
    }

    private showLoader() {
        this.loaderService.showLoader();
    }

    private hideLoader() {
        this.loaderService.hideLoader();
    }

    // private onEndRequest() {
    //     this.hideLoader();
    // }
}
