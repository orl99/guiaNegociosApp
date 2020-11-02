

import { createAction, props } from '@ngrx/store';

export const setPage = createAction(
    '[Menu Component] SetPage',
    props<{ page: string }>()
);
