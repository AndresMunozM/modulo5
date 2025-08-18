import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductService } from './services/product.service';
import { ProductApiService } from './services/product-api.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, AsyncPipe, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'catalogo-productos';
  products: any[] = [];
  carrito: any[] = [];
  productosFiltrados: any[] = [];
  terminoBusqueda: string = '';

  currentPage = 1;
  totalProducts = 0;
  itemsPerPage = 10;
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private productApiService: ProductApiService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.productService.getCarrito().subscribe(items => {
      this.carrito = items;
    });
  }

  cargarProductos(page: number = 1): void {
    this.loading = true;
    this.error = null;
    this.productApiService.getProducts(page, this.itemsPerPage).subscribe({
      next: (res) => {
        this.products = res.products;
        this.productosFiltrados = res.products;
        this.totalProducts = res.total;
        this.currentPage = page;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  buscar(): void {
    const termino = this.terminoBusqueda.trim().toLowerCase();
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s]+$/;

    if(!regex.test(termino)){
      alert('La búsqueda solo puede contener letras, números y espacios.');
      return;
    }
  
    this.productosFiltrados = this.products.filter(p =>
      p.title.toLowerCase().includes(termino) ||
      p.category.toLowerCase().includes(termino)
    );
  }

  resetBusqueda(): void {
    this.terminoBusqueda = '';
    this.productosFiltrados = this.products;
  }

  agregarAlCarrito(product:any): void {
    this.productService.addToCart(product);
  }

  comprar(): void {
    const total = this.productService.getTotal();
    alert(`Has comprado ${this.carrito.length} producto(s) por un total de $${total}`);
    this.productService.clearCart();
  }

  get total(): number {
    return this.productService.getTotal();
  }

  get count(): number {
    return this.carrito.length;
  }

  cambiarPagina(delta: number): void {
    const newPage = this.currentPage + delta;
    const maxPages = Math.ceil(this.totalProducts / this.itemsPerPage);

    if (newPage >= 1 && newPage <= maxPages) {
      this.cargarProductos(newPage);
    }
  }
  get totalPages(): number {
  return Math.ceil(this.totalProducts / this.itemsPerPage);
  }
}