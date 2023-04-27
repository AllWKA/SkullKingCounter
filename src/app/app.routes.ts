import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'player-form',
    loadComponent: () => import('./playersForm/players.form.component').then((m) => m.PlayersFormComponent)
  }
];
