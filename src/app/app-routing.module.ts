import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthenticationGuard } from './components/authentication/authentication.guard';
import { HomeMenuComponent } from './components/home/home-menu/home-menu.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: HomeMenuComponent },
      {
        path: 'estimates',
        loadChildren: () =>
          import('./components/estimate/estimate.module').then(
            (m) => m.EstimateModule
          ),
      },
      {
        path: 'suppliers',
        loadChildren: () =>
          import('./components/supplier/supplier.module').then(
            (m) => m.SupplierModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./components/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
    ],
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./components/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
