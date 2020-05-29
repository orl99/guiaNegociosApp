import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';

// Interfaces
import { Post } from 'src/app/models/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag, LiteTag } from 'src/app/models/tags.interface';

// AdMob ionic plugs
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from '@rdlabo/capacitor-admob';
const { AdMob } = Plugins;
// Ionic
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-post',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostPage implements OnInit, AfterViewInit {
  category: number;
  allPosts: Post[] = [];
  inmutePosts: Post[] = [];
  allTags: LiteTag[] = [];
  at: LiteTag[] = [];
  pageNum = 1;
  initialPostsLenght: number;
  infinityLoadingFlag = false;

  // Dom elements
  @ViewChild('infiLoadingEl', { static: false }) infiLoadingEl: ElementRef;

  // AdMob Options for posts in android platform
  private AdMobOptions: AdOptions = {
    adId: 'ca-app-pub-8693507653531046/5975277721',
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: true
  };
  constructor(private wpService: WordpressApiService,
              private route: ActivatedRoute,
              private router: Router,
              private toastCtrl: ToastController) {
    route.params.subscribe((params) => {
      this.category = params['catId'];
    });
    // // AdMob config init
    // AdMob.showBanner(this.AdMobOptions);
    // AdMob.addListener('onAdLoaded', () => {
    //   console.log('AdMob banner loaded');
    // });
    // AdMob.addListener('onAdSize', (info: boolean) => {
    //   console.log('AdMob size', info);
    // });
  }

  async ngOnInit() {
    // Get tags
    const responseTags = await this.wpService.getTagsByCat(this.category);
    console.log('Tags', responseTags);
    this.allTags = responseTags;
  }

  // TODO: TEST PERFORMANCE
  async ngAfterViewInit() {
    // // Get all the posts by category
    // const response = await this.wpService.getPostsByCat(this.category, this.pageNum);
    // this.initialPostsLenght = response.length;
    // console.log('Response', response);
    // this.inmutePosts = [...response];
    // this.allPosts = [...response];
    // // this.allTags = [...this.getTagsFromPost()];
    // console.log(this.initialPostsLenght);
    // // TODO: TEST funct
    // if (this.initialPostsLenght < 5) {
    //   console.log('Infinity scroll disabled');
    //   this.infinityLoadingFlag = true;
    // }
    this.loadPosts();
  }

  async loadPosts() {
    // Get all the posts by category
    const response = await this.wpService.getPostsByCat(this.category, this.pageNum);
    this.initialPostsLenght = response.length;
    console.log('Response', response);
    this.inmutePosts = [...response];
    this.allPosts = [...response];
    console.log(this.initialPostsLenght);
    // TODO: TEST funct
    if (this.initialPostsLenght < 5) {
      console.log('Infinity scroll disabled');
      this.infinityLoadingFlag = true;
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
      console.log('all posts', this.allPosts);
      this.inmutePosts = [...this.allPosts];

      // Get more tags
      // this.allTags = [...this.getTagsFromPost()];
      $event.target.complete();
    }
    if ( !response.length ) {
      console.log('infinty loading cancel');
      $event.target.disabled = true;
      const toastMessage = await this.toastCtrl.create({
        duration: 2000,
        message: 'Estas al dia :)',
        color: 'dark'
      });
      toastMessage.present();
    }
  }

  filterPosts(filterVal: number | string) {
    // Reset all the posts
    this.pageNum = 0;
    this.allPosts = [];
    this.inmutePosts = [];
    if (filterVal === 'all') {
      // Normal posts
      this.loadPosts();
    } else {
      // Number() hack ;)
      this.loadMorePostByTag(Number(filterVal));
    }
  }

  async loadPostsByTag(tagId: number) {
    // Get all the posts by category
    const response = await this.wpService.getPostByCatAndTags(this.category, tagId, this.pageNum);
    this.initialPostsLenght = response.length;
    console.log('Response', response);
    this.inmutePosts = [...response];
    this.allPosts = [...response];
    console.log(this.initialPostsLenght);
    // TODO: TEST funct
    if (this.initialPostsLenght < 5) {
      console.log('Infinity scroll disabled');
      this.infinityLoadingFlag = true;
    }
  }

  // This method will load more post with pages
  async loadMorePostByTag(filterVal: number) {
    // load more post by tag
    const response = await this.wpService.getPostByCatAndTags(this.category, filterVal, this.pageNum);
    console.log('FilterVars', response);
    if (response.length) {
      this.allPosts = [...response];
    }
  }

  // Navigate to the post page
  async goPost(postId: number) {
    this.router.navigate(['categories/post', postId]);
  }



  // Decription------------------------------------------------------------------------------------------------>
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
  postFilter(filterVal: number | string) {
    console.log('Filter', filterVal);
    if (filterVal === 'all') {
      this.allPosts = [...this.inmutePosts];
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

}
