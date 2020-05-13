import { Component, OnInit } from '@angular/core';

import { WordpressApiService } from 'src/app/services/wordpress-api.service';
import { Categories } from 'src/app/models/categories.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Categories[];
  constructor( private wpService: WordpressApiService,
               private router: Router) { }

  async ngOnInit() {
    const res = await this.wpService.getCategories();
        console.log('res', res);
    this.categories = res;

  }

  goPostsByCat(catId: number) {
    this.router.navigate(['categories/posts/', catId]);
  }

}
