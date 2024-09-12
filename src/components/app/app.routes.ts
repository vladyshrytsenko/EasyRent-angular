import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('../login/login.component').then(m => m.LoginComponent) },
    { path: 'floors', loadComponent: () => import('../floor/floor.component').then(m => m.FloorComponent) },
    { path: 'floors/:id', loadComponent: () => import('../floor/floor-detail/floor-detail.component').then(m => m.FloorDetailComponent) },  // Этаж по ID
    { path: '', component: AppComponent },
      { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }