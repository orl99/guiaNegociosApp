

import { createReducer, on } from '@ngrx/store';
import { setPage } from '../actions/menu.actions';

export interface MenuState {
    page: string;
}

export const initialState: MenuState = {
   page: '',
};

// tslint:disable-next-line: variable-name
const _menuReducer = createReducer(initialState,

    on( setPage, (state, { page }) => ({
        ...state,
        page
    })),
);

export function menuReducer(state, action) {
    return _menuReducer(state, action);
}


