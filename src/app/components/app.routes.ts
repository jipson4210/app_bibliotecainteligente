import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./registration-form/registration-form.component').then(m => m.RegistrationFormComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./registration-form/registration-form.component').then(m => m.RegistrationFormComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent)
  }
];
