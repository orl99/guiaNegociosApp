

import { createReducer, on } from '@ngrx/store';
import { setDarkMode } from '../actions/darkMode.action';

export interface DarkModeState {
    darkMode: boolean;
}

export const initialState: DarkModeState = {
   darkMode: false,
};

// tslint:disable-next-line: variable-name
const _darkModeReducer = createReducer(initialState,

    on( setDarkMode , (state, { darkMode }) => ({
        ...state,
        darkMode
    })),

);

export function darkModeReducer(state, action) {
    return _darkModeReducer(state, action);
}


