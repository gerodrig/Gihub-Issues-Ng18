import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'issue/:number',
        loadComponent: () => import('./modules/issues/pages/issue/issue-page.component')
    },
    {
        path: 'issues',
        loadComponent: () => import('./modules/issues/pages/issues-list/issues-list-page.component')
    },
    {
        path: '**',
        redirectTo: 'issues'
    }

];
