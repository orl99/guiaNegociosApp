

import { createReducer, on } from '@ngrx/store';
import { PostFavorito } from '../../models/post.interface';
import { setFavoritos } from '../actions/favoritos.action';

export interface FavoritosState {
    favoritos: PostFavorito[];
}

export const initialState: FavoritosState = {
    favoritos: [],
};

// tslint:disable-next-line: variable-name
const _favoritosReducer = createReducer(initialState,

    on(setFavoritos, (state, { favoritos }) => ({
        ...state,
        favoritos
    })),

);

export function favoritosReducer( state, action) {
    return _favoritosReducer( state, action);
}


