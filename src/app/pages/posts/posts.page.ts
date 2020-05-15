import { Component, OnInit, Input } from '@angular/core';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';
// Interfaces
import { Post } from 'src/app/models/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from 'src/app/models/tags.interface';
import { element } from 'protractor';

@Component({
  selector: 'app-post',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostPage implements OnInit {
  category: number;
  allPosts: Post[];
  inmutePost: Post[];
  allTags: Tag[] = [];
  at: Tag[] = [];
  constructor(private wpService: WordpressApiService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe((params) => {
      this.category = params['catId'];
    });
  }

  async ngOnInit() {
    // Get post
    const response = await this.wpService.getPostsByCat(this.category);
    console.log('Response', response);
    this.inmutePost = response;
    this.allPosts = [...response];
    // Get Tags
    // const tagsRes = await this.wpService.getTags();
    // console.log('tags', tagsRes);
    // tagsRes.forEach((e) => {
    //   if (e.count > 0) { this.allTags.push(e); }
    // });

    this.allTags = this.getTagsFromPost();
  }
  // This function will return a list of tags from the post that are not duplicated
  // This algo can be refactor to another tipe of filter
  getTagsFromPost(): Tag[] {
    // TODO: test algo
    // Geting Tags from posts
    const post = [...this.inmutePost];
    const tags = post.map(e => e.tags);
    const tax: Tag[] = [];
    tags.forEach(el => {
      tax.push(...el);
    });
    // console.log('tax', tax);

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
        // console.log('existsTags', existsTags);
      }
    });
    // console.log('newTags', newTags);
    return newTags;
  }

  async goPost(postId: number) {
    this.router.navigate(['categories/post', postId]);
  }

  // Test
  postFilter(filterVal: number | string) {
    console.log('Filter', filterVal);
    if (filterVal === 'all') {
      this.allPosts = [...this.inmutePost];
    } else {
      // Filter post
      const allPostTemp = [...this.inmutePost];
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
      console.log('inmutrqable', this.inmutePost);
    }
  }

}
