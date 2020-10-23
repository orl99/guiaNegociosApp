

import { createAction, props } from '@ngrx/store';
import { PostFavorito } from '../../models/post.interface';

export const setFavoritos = createAction(
    '[Favoritos Component] setFavoritos',
    props<{ favoritos: PostFavorito[]}>()
);

export const clearFavoritos = createAction( '[Favoritos Component] clear Favoritos' );
