import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../product/product.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8087/api/product';

  constructor(private http: HttpClient) { }


  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, product);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
