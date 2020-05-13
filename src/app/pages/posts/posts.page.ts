import { Component, OnInit, Input } from '@angular/core';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';
// Interfaces
import { Post } from 'src/app/models/post.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostPage implements OnInit {
  category: number;
  allPosts: Post[];
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
  }

  async goPost(postId: number) {
    this.router.navigate(['categories/post', postId]);
  }

}
