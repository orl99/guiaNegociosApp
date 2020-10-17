import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';
import { PostFavorito } from '../../models/post.interface';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  postsFav: PostFavorito[] = [];

  constructor( private favService: FavoritosService) { }

  async ngOnInit() {

    this.postsFav  = await this.favService.getFavoritos();
    console.log( this.postsFav );
  }

}
