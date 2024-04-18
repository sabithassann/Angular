import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from './product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { error } from 'node:console';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  editProduct: Product | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.productService.addProduct(product).subscribe(
        (response) => {
          console.log('Product added successfully');
          this.fetchProducts();
          this.productForm.reset();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

  editProductDetails(product: Product): void {
    this.editProduct = { ...product };
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });
  }

  updateProduct(): void {
    if (this.editProduct && this.productForm.valid) {
      const updatedProduct: Product = {
        ...this.editProduct,
        ...this.productForm.value
      };
      this.productService.updateProduct(updatedProduct.id!, updatedProduct).subscribe(
        (response) => {
          console.log('Product updated successfully');
          this.fetchProducts();
          this.editProduct = null;
          this.productForm.reset();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        console.log('Product deleted successfully');
        this.fetchProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editProduct = null;
    this.productForm.reset();
  }
}



