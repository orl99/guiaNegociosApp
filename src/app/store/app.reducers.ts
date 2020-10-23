
import { ActionReducerMap } from '@ngrx/store';
import { favoritosReducer, FavoritosState } from './reducers/favoritos.reducer';


export interface AppState {
   favoritos: FavoritosState;
}


export const appReducers: ActionReducerMap<AppState> = {
   favoritos: favoritosReducer,
};

