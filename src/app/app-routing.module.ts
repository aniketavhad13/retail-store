import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreDetailsComponent } from './store-details/store-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-details',
    pathMatch: 'full'
  },
  {
    path: 'product-details',
    component: StoreDetailsComponent
  },
  // {
  //   path: '**'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
