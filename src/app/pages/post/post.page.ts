import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressApiService } from 'src/app/services/wordpress-api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  postId: number;
  postHTML: string;
  constructor(private route: ActivatedRoute,
              private wpService: WordpressApiService) {
    route.params.subscribe(params => this.postId = params['postId']);
  }

  async ngOnInit() {
    const response = await this.wpService.getPost(this.postId);
    console.log('Response', response);
    this.postHTML = response[0].content.rendered;
  }

}
