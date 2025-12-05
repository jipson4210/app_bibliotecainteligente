import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./registration-form/registration-form.component').then(m => m.RegistrationFormComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./registration-form/registration-form.component').then(m => m.RegistrationFormComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent)
  }
];
