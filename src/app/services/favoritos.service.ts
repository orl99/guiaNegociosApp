import { Injectable } from '@angular/core';
import { PostFavorito } from '../models/post.interface';

import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { setFavoritos } from '../store/actions/favoritos.action';
import { WordpressApiService } from './wordpress-api.service';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private favoritos: PostFavorito[] = [];

  constructor( private storage: Storage,
               private store: Store<AppState>,
               private wpApiService: WordpressApiService,
               private loadingCtrl: LoadingController,
               ) {

    this.cargarFavoritos();
  }

  async agregar( post: PostFavorito ) {
    // console.log('Agregando Post a Favoritos..: ', post );

    if ( !( this.isFavorito( post ) ) ) {
      if ( ! this.favoritos) {
        this.favoritos = [ post ];
      } else {
        this.favoritos.push( post );

      }
      await this.storage.set('favoritos', this.favoritos );
      this.store.dispatch( setFavoritos( {favoritos: [...this.favoritos]} ));
      // console.log( this.favoritos );
    } else {
      console.log('Ya Pertenecia a Favoritos');
    }
  }


  async quitar( post: PostFavorito ) {
    // console.log('Quitando Post de Favoritos: ', post);
    if ( this.isFavorito( post ) ) {
      this.favoritos = this.favoritos.filter( fav => ( (fav.id !== post.id) && (fav.title !== post.title) ) );
      await this.storage.set('favoritos', this.favoritos );
      this.store.dispatch( setFavoritos( {favoritos: [...this.favoritos]} ));
    }
  }

  getFavoritos(): PostFavorito[] {
    return this.favoritos;
  }


  isFavorito( post: PostFavorito ): boolean {
    let resultado = false;

    if ( this.favoritos ) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.favoritos.length; i++) {
        if ( (post.id === this.favoritos[i].id) && (post.title === this.favoritos[i].title ) ) {
          resultado = true;
          break;
        }
      }
    }
    return resultado;
  }

  async cargarFavoritos() {
    const datos = await this.storage.get( 'favoritos');
    // console.log('Datos del Storage');
    // console.log( datos );
    if ( datos ) {
      this.favoritos = datos;
    } else {
      this.favoritos = [];
    }
    // console.log('cargando Favoritos:', this.favoritos );
    this.store.dispatch( setFavoritos( {favoritos: [...this.favoritos]} ));
    // console.log('favoritos', this.favoritos );
  }


  async favoritosWordPress() {
    // console.log('Info. de Post Favoritos: ');
    const loader = await this.loadingCtrl.create({ message: 'loading...' });
    await loader.present();
    // tslint:disable-next-line: prefer-const
    let postsFavoritos: any[] = [];
    for (const fav of this.favoritos ) {
      const resp = await this.wpApiService.getPost2( fav.id );
      // console.log( resp );
      postsFavoritos.push( resp );
    }
    await loader.dismiss();
    return postsFavoritos;
  }

}
