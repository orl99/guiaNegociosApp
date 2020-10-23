import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';

// AdMob ionic plugs
import { Plugins } from '@capacitor/core';
import { FavoritosService } from '../../services/favoritos.service';

import { PostFavorito } from '../../models/post.interface';
import { ToastController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

const { AdMob } = Plugins;

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, OnDestroy {
  postId: number;
  mainImage: string;
  postHTML: string;
  postTitle: string;
  favorito: boolean;

  postAct: PostFavorito;

  constructor(private route: ActivatedRoute,
              private wpService: WordpressApiService,
              // tslint:disable-next-line: no-shadowed-variable
              private toastCtrl: ToastController,
              private favService: FavoritosService,
              private store: Store<AppState>,

              ) {
    route.params.subscribe(params => this.postId = params['postId']);
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    // console.log('OnDestroy');
  }

  async ngOnInit() {
    const response = await this.wpService.getPost(this.postId);
    // console.log('Response', response);
    this.mainImage = response.featured_image.large;
    this.postTitle = response.title;
    this.postHTML = response.content;
    this.stylePostTags();
    // console.log(response.featured_image);

    this.postAct = {
      id: Number(this.postId),
      title: this.postTitle
    };

    this.favorito = await this.favService.isFavorito( this.postAct );

  }

  stylePostTags() {
    // Custom css
    setTimeout(() => {
      // TODO: Test this hack
      const imgs = document.getElementsByTagName('img');
      const preEles = document.getElementsByTagName('pre');
      Array.from(imgs).forEach(el => {
        el.style.height = 'auto';
      });
      Array.from(preEles).forEach(el => {
        el.style.whiteSpace = 'pre-wrap';
        el.style.fontSize = '12.5px';
      });
    }, 100);
  }


  onClick() {
    this.favorito = !this.favorito;
    if ( this.favorito ) {
      this.presentToast(`Agregando: "${this.postAct.title}" a Favoritos`);
      this.favService.agregar( this.postAct );
    } else {
      this.presentToast(`Removiendo: "${this.postAct.title}" de Favoritos`);
      this.favService.quitar( this.postAct );
    }
  }



  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'dark',
    });
    toast.present();
  }

}
