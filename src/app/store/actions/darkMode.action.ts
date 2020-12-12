


import { createAction, props } from '@ngrx/store';

export const setDarkMode = createAction(
    '[DarkMode Component] SetDarkMode',
    props<{ darkMode: boolean }>()
);
