import { Component, OnInit, OnDestroy } from '@angular/core';

import { FavoritosService } from '../../services/favoritos.service';
import { Post, PostFavorito } from '../../models/post.interface';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit, OnDestroy {

  postsFav: PostFavorito[] = [];
  allPosts: Post[] = [];


  postFavSubs: Subscription;

  constructor( private favService: FavoritosService,
               private store: Store<AppState>,
               private router: Router,
    ) { }

  ngOnDestroy(): void {
    if ( this.postFavSubs ) {
      this.postFavSubs.unsubscribe();
    }
  }

  async ngOnInit() {
    this.postsFav  = await this.favService.getFavoritos();
    // console.log( this.postsFav );

    this.postFavSubs = this.store.select('favoritos').subscribe( async ({favoritos}) => {
      this.postsFav = favoritos;
      console.log('PostFavoritos:', this.postsFav );
      this.allPosts = await this.favService.favoritosWordPress();

    });


    this.allPosts = await this.favService.favoritosWordPress();

    console.log('All Post Favoritos: ', this.allPosts );
  }

  async gofavorito(postId: number) {
    this.router.navigate(['favorito', postId]);
    // this.router.navigate(['favorito']);
  }


}
