import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuard } from '../login/auth-guard';
import { HttpClientModule, withFetch } from '@angular/common/http';

export const routes: Routes = [
    { 
      path: 'login', 
      loadComponent: () => import('../login/login.component').then(m => m.LoginComponent) 
    },
    { 
      path: 'floors', 
      loadComponent: () => import('../floor/floor.component').then(m => m.FloorComponent), 
      canActivate: [AuthGuard] 
    },
    { 
      path: 'floors/:id', 
      loadComponent: () => import('../floor/floor-detail/floor-detail.component').then(m => m.FloorDetailComponent) 
    },
    { 
      path: '', 
      redirectTo: 'floors', 
      pathMatch: 'full' 
    },
    { 
      path: '404', 
      component: NotFoundComponent 
    },
    { 
      path: '**', 
      redirectTo: "/404" 
    } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }