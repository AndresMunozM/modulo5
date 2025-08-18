import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ProductDetailComponent } from './app/product-detail/product-detail.component';
import { provideHttpClient } from '@angular/common/http';


const routes: Routes = [
  { path: '', component: AppComponent },  
  { path: 'producto/:id', component: ProductDetailComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});