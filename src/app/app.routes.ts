import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
];