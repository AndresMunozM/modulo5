import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiUrl = 'https://dummyjson.com/products';
  /* La api de dummyjson es un servicio web gratuito para proporcionar datos ficticios en formato Json, ideal para realizar
  practicas como esta, ya que permite un amplio catalogo de productos para hacer varias pruebas de busqueda y filtro para
  el proyecto */

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, limit: number = 10): Observable<any> {
    const skip = (page - 1) * limit;
    return this.http.get(`${this.apiUrl}?limit=${limit}&skip=${skip}`).pipe(
      map((response: any) => response),
      catchError(err => {
        console.error('Error al obtener productos:', err);
        return throwError(() => new Error('No se pudieron cargar los productos.'));
      })
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener detalle del producto:', err);
        return throwError(() => new Error('No se pudo cargar el producto.'));
      })
    );
  }
}