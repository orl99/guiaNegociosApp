import { Component, OnInit } from '@angular/core';

// services http
import { WordpressApiService } from 'src/app/services/wordpress-api.service';
import { Router } from '@angular/router';

// Models
import { OldPost } from 'src/app/models/post.interface';
@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.page.html',
  styleUrls: ['./recursos.page.scss'],
})
export class RecursosPage implements OnInit {

  // pageNum = 1;
  // allPosts: OldPost[];

  constructor() { }
  // constructor(private wpservce: WordpressApiService,
  //             private router: Router) { }

  async ngOnInit() {
    // const response = await this.wpservce.getCustomPostType('recursos', this.pageNum);
    // console.log('res', response);
    // this.allPosts =  response;
  }


}
