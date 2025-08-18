import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { BehaviorSubject, Observable } from "rxjs"; 

/* Este sercicio product.service, funciono en su momento para los primeros ejemplos del catalogo antes de implementar la API 
para la parte final, en este se cargaban algunos ejemplos de productos para catalogo y para practicar con el decorador
@injectable para marcar la clase.  */

@Injectable({
    providedIn: 'root',

})
export class ProductService {
    private products: Product[] = [
        { id: 1, title: 'Producto 1', price: 50, description: 'Audifonos', category: 'electronica', images: 'https://ankerstore.cl/cdn/shop/files/Galeria-1000x1000_1_2b02c7b2-c87a-4af4-98c7-9e2897961845_560x560.png?v=1747058040' },
        { id: 2, title: 'Producto 2', price: 100, description: 'reloj', category: 'electronica', images: 'https://http2.mlstatic.com/D_NQ_NP_838647-MLA47630744373_092021-O.webp' },
        { id: 3, title: 'Producto 3', price: 100, description: 'corbata', category: 'ropa', images: 'https://eu-images.contentstack.com/v3/assets/blt7dcd2cfbc90d45de/blt0fc0067a578e3383/60dba3faa7307e39e4ded1fd/14_35.jpg?format=pjpg&auto=webp&quality=75%2C90&width=3840' },
        { id: 4, title: 'Producto 4', price: 30, description: 'anillo', category: 'joyeria', images: 'https://m.media-amazon.com/images/I/61mIXWv+ZaL._AC_UY1000_.jpg' },
    ];

    private carrito: Product[] = [];
    private carritoSubject = new BehaviorSubject<Product[]>([]);

    getProducts(): Product[] {
        return this.products;
    }

    getCarrito(): Observable<Product[]> {
        return this.carritoSubject.asObservable();
    }

    addToCart(product: Product): void {
        this.carrito.push(product);
        this.carritoSubject.next(this.carrito);
    }

    clearCart(): void {
        this.carrito = [];
        this.carritoSubject.next([]);
    }

    getTotal(): number {
        return this.carrito.reduce((sum, p) => sum + p.price, 0);

    }

    getCartCount(): number {
        return this.carrito.length;
    }

    getProductById(id: number) {
        return this.products.find(p => p.id === id);
    }
}
