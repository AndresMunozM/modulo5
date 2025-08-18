import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../services/product-api.service';
import { RouterModule } from '@angular/router';
import { Product } from '../models/product.model';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html'
})

export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productApiService = inject(ProductApiService);

  product: Product | null = null;
  loading: boolean = true;
  error: string = '';
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productApiService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "No se encuentra el producto";
        this.loading = false;
        console.error(err);  
      }
    });
  }
}