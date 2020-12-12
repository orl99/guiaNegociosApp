
import { ActionReducerMap } from '@ngrx/store';

import { favoritosReducer, FavoritosState } from './reducers/favoritos.reducer';
import { menuReducer, MenuState } from './reducers/menu.reducers';
import { DarkModeState, darkModeReducer } from './reducers/darkMode.reducer';


export interface AppState {
   favoritos: FavoritosState;
   page: MenuState;
   darkMode: DarkModeState;
}


export const appReducers: ActionReducerMap<AppState> = {
   favoritos: favoritosReducer,
   page: menuReducer,
   darkMode: darkModeReducer,
};

