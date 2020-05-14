import { Component, OnInit, Input } from '@angular/core';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';
// Interfaces
import { Post } from 'src/app/models/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Tags } from 'src/app/models/tags.interface';

@Component({
  selector: 'app-post',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostPage implements OnInit {
  category: number;
  allPosts: Post[];
  allTags: Tags[] = [];
  constructor(private wpService: WordpressApiService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe((params) => {
      this.category = params['catId'];
    });
  }

  async ngOnInit() {
    const response = await this.wpService.getPostsByCat(this.category);
    console.log('Response', response);
    this.allPosts = response;
    const tagsRes = await this.wpService.getTags();
    console.log('tags', tagsRes);
    tagsRes.forEach((e) => {
      if (e.count > 0) { this.allTags.push(e); }
    });

  }

  async goPost(postId: number) {
    this.router.navigate(['categories/post', postId]);
  }

}
