import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';

// Interfaces
import { Post } from 'src/app/models/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag, LiteTag } from 'src/app/models/tags.interface';

// AdMob ionic plugs
import { Plugins } from '@capacitor/core';

const { AdMob } = Plugins;
// Ionic
import { ToastController } from '@ionic/angular';

import { FavoritosService } from '../../services/favoritos.service';
import { PostFavorito } from '../../models/post.interface';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostPage implements OnInit, AfterViewInit, OnDestroy {
  category: number;
  allPosts: Post[] = [];
  inmutePosts: Post[] = [];
  allTags: LiteTag[] = [];
  at: LiteTag[] = [];
  pageNum = 1;
  initialPostsLenght: number;
  infinityLoadingFlag = true;
  pageFilterModeFlag = false;
  filterTagId: number;


  favoritos: PostFavorito[] = [];
  favoritosSubs: Subscription;
  // Dom elements
  @ViewChild('infiLoadingEl', { static: false }) infiLoadingEl: ElementRef;
  constructor(private wpService: WordpressApiService,
              private route: ActivatedRoute,
              private router: Router,
              private favService: FavoritosService,
              private store: Store<AppState>
              ) {
    route.params.subscribe((params) => {
      this.category = params.catId;
    });
  }

  ngOnDestroy(): void {
    console.log('Destroy Posts');

    if ( this.favoritosSubs ) {
      this.favoritosSubs.unsubscribe();
    }
  }

  async ngOnInit() {
    // Get tags by category
    const responseTags = await this.wpService.getTagsByCat(this.category);
    console.log('Tags', responseTags);
    this.allTags = responseTags;

    this.favoritos = await this.favService.getFavoritos();
    console.log('Post Favoritos: ', this.favoritos );

    this.favoritosSubs = this.store.select('favoritos').subscribe( ({favoritos}) => {
      console.log('Store State : ', favoritos );
      this.favoritos = favoritos;
      this.asignaFavoritos();
    });

    this.infinityLoadingSwitch(true); // Nuevo


  }

  // TODO: TEST PERFORMANCE
  async ngAfterViewInit() {
    // Load All Posts by 5 to 5
    this.loadPosts();
  }

  /* Load All Posts --------------------------------------------------------------------*/
  async loadPosts() {
    this.pageFilterModeFlag = false;
    // Get all the posts by category
    const response = await this.wpService.getPostsByCat(this.category, this.pageNum);
    this.initialPostsLenght = response.length;
    console.log('Response', response);
    this.inmutePosts = [...response];
    this.allPosts = [...response];
    this.asignaFavoritos();
    console.log(this.initialPostsLenght);
    // TODO: TEST funct
    if (this.initialPostsLenght < 10) {
      console.log('Infinity scroll disabled');
      this.infinityLoadingSwitch(false); // antes false
    }
  }

  // Thids method will call for more posts
  async loadMorePost($event: any) {
    this.pageNum ++;
    const response =  await this.wpService.getPostsByCat(this.category, this.pageNum);
    if ( response.length ) {
      console.log('More loaded posts', response);
      const post = [...this.allPosts];
      this.allPosts = [...post, ...response];
      this.asignaFavoritos();
      console.log('all posts', this.allPosts);
      this.inmutePosts = [...this.allPosts];

      // Get more tags
      // this.allTags = [...this.getTagsFromPost()];
      $event.target.complete();
    }
    if ( !response.length ) {
      console.log('infinty loading cancel');
      $event.target.disabled = true;
    }
  }
  /* Load All Posts --------------------------------------------------------------------*/

  /* Load Posts by tag -------------------------------------------------------------------- */
  // Load posts by tag -> just the first 5, this methos is not compatible with infinity loading
  async loadPostsByTag(tagId: number) {
    // Get all the posts by category
    const response = await this.wpService.getPostByCatAndTags(this.category, tagId, this.pageNum);
    this.initialPostsLenght = response.length;
    console.log('Response', response);
    this.inmutePosts = [...response];
    this.allPosts = [...response];
    this.asignaFavoritos();
    // TODO: TEST funct
    if (this.initialPostsLenght < 10) {
      console.log('Infinity scroll disabled');
      this.infinityLoadingSwitch(false); //antes false
    }
  }

  // This method will load more post 5 by 5 with infinity loading
  async loadMorePostByTag($event: any ) {
    // load more post by tag
    this.pageNum++;
    const response = await this.wpService.getPostByCatAndTags(this.category, this.filterTagId, this.pageNum);
    console.log('FilterVars', response);
    if ( response.length ) {
      console.log('More loaded posts by tag', response);
      const post = [...this.allPosts];
      this.allPosts = [...post, ...response];
      this.asignaFavoritos();
      console.log('all posts by tag', this.allPosts);
      this.inmutePosts = [...this.allPosts];
      $event.target.complete();
    }
    if ( !response.length ) {
      console.log('infinty loading cancel');
      $event.target.disabled = true;
    }
  }
  /* Load Posts by tag -------------------------------------------------------------------- */


  /* Filter methos -------------------------------------------------------------------- */
  filterPosts(filterVal: number) {
    // Reset all the posts
    this.infinityLoadingSwitch(true);
    this.pageNum = 1;
    this.allPosts = [];
    this.inmutePosts = [];
    console.log('filterval', filterVal);
    // tslint:disable-next-line: triple-equals
    if (filterVal == -1) {
      this.filterTagId = 0;
      this.pageFilterModeFlag = false;
      // Normal posts
      console.log('Normal post');
      this.loadPosts();
    } else {
      this.filterTagId = filterVal;
      this.pageFilterModeFlag = true;
      this.loadPostsByTag(filterVal);
    }
  }
  /* Filter methos -------------------------------------------------------------------- */

  // Navigate to the post page
  async goPost(postId: number) {
    this.router.navigate(['categories/post', postId]);
  }

  // Inifinity loading switch
  private infinityLoadingSwitch(status: boolean) {
    (status) ? this.infinityLoadingFlag = true  : this.infinityLoadingFlag = false;
    console.log('INFINITY LOADING', status );
  }

  // Decripted methods ---------------------------------------------------------------------------------->
  // This function will return a list of tags from the post that are not duplicated
  // This algo can be refactor to another tipe of filter
  // Decrepted
  getTagsFromPost(): Tag[] {
    // TODO: test algo
    // Geting Tags from posts
    const post = [...this.inmutePosts];
    const tags = post.map(e => e.tags);
    const tax: Tag[] = [];
    tags.forEach(el => {
      tax.push(...el);
    });

    // Filter the duplicate tags
    const newTags: Tag[] = [];
    tax.forEach(e => {
      if (!newTags.length) {
          newTags.push(e);
      } else {
        // Cheacking if the tag is not duplicated
        const existsTags = newTags.filter(tgEl => tgEl.term_taxonomy_id === e.term_taxonomy_id );
        if (!existsTags.length) {
          newTags.push(e);
        }
      }
    });
    return newTags;
  }

  // Decrepted
  postFilter(filterVal: number) {
    console.log('Filter', filterVal);
    if (filterVal === -1) {
      this.allPosts = [...this.inmutePosts];
      this.asignaFavoritos();
    } else {
      // Filter post
      const allPostTemp = [...this.inmutePosts];
      const filterPost = allPostTemp.filter((post) => {
        // Filter tags
        const tagFilte = post.tags.filter((tag) => tag.term_taxonomy_id === filterVal);
        if (!!tagFilte.length) {
          return post;
        }
    });
      console.log('filterVal', filterVal);
      console.log('filterPost', filterPost);
      this.allPosts = [...filterPost];
      console.log('inmutrqable', this.inmutePosts);
    }
  }



    asignaFavoritos() {
      if ( this.allPosts && this.favoritos ) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.allPosts.length; i++ ) {
          this.allPosts[i].favorito = false;
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < this.favoritos.length; j++) {
            if ( (this.allPosts[i].id == this.favoritos[j].id) && (this.allPosts[i].title == this.favoritos[j].title)  ) {
              this.allPosts[i].favorito = true;
              break;
            }
          }
        }
      }
    }
}

