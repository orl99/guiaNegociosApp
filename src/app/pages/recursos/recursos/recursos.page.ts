import { Component, OnInit, OnDestroy } from '@angular/core';

// services http
import { WordpressApiService } from 'src/app/services/wordpress-api.service';
import { ActivatedRoute, Router } from '@angular/router';


// Models
import { BasePostEmbeb, PostFavorito } from 'src/app/models/post.interface';
import { Subscription } from 'rxjs/internal/Subscription';

import { FavoritosService } from 'src/app/services/favoritos.service';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { setPage } from 'src/app/store/actions/menu.actions';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.page.html',
  styleUrls: ['./recursos.page.scss'],
})
export class RecursosPage implements OnInit, OnDestroy {
  category: number;
  pageNum = 1;
  allPosts: BasePostEmbeb[];
  infinityLoadingFlag = true;
  // pageFilterModeFlag = false;
  initialPostsLenght: number;

  favoritos: PostFavorito[] = [];
  favoritosSubs: Subscription;

  constructor(private wpservce: WordpressApiService,
              private router: Router,
              private route: ActivatedRoute,
              private favService: FavoritosService,
              private store: Store<AppState>
              ) {

    route.params.subscribe((params) => {
      this.category = params.catId;
      // console.log(params.catId);
    });
  }


  ngOnDestroy(): void {
    if ( this.favoritosSubs ) {
      this.favoritosSubs.unsubscribe();
    }
  }

  async ngOnInit() {
    this.store.dispatch( setPage({ page: 'Recursos'}) );

    const response = await this.wpservce.getCustomPostType('recursos', this.category, this.pageNum);
    // console.log('res', response);
    this.allPosts = response;

    this.favoritos = await this.favService.getFavoritos();

    this.favoritosSubs = this.store.select('favoritos').subscribe( ({favoritos}) => {
      // console.log('Store State : ', favoritos );
      this.favoritos = favoritos;
      this.asignaFavoritos();
    });

    if (response.length < 10) {
      console.log('Infinity scroll disabled');
      this.infinityLoadingFlag = false;
    }
  }

  public goPost(catId: number) {
    this.router.navigate(['recursos/recurso/', catId]);
  }

  public async loadMorePost($event: any) {
    this.pageNum ++;
    const response = await this.wpservce.getCustomPostType('recursos', this.category, this.pageNum);
    // console.log('res', response);
    if (response.length) {
      // console.log('More loaded post', response);
      const post = [...this.allPosts];
      this.allPosts = [...post, ...response];
      // console.log('all post', this.allPosts);
      this.asignaFavoritos();
      $event.target.complete();
    }
    if (response.length < 10) {
      // console.log('Infinity loading cancel');
      $event.target.disabled = true;
    }
    $event.target.complete();
  }


  asignaFavoritos() {
    if ( this.allPosts && this.favoritos ) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.allPosts.length; i++ ) {
        this.allPosts[i].favorito = false;
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < this.favoritos.length; j++) {
          if ( this.allPosts[i].id == this.favoritos[j].id  ) {
            this.allPosts[i].favorito = true;
            break;
          }
        }
      }
    }
  }

}
