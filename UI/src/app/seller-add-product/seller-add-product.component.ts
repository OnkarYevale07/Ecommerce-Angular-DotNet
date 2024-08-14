import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined;
  constructor(private productService:ProductService){}

  submit(data:Product){
    this.productService.addProduct(data).subscribe((result)=>{
      if(result){
        this.addProductMessage="Product added successfully";
      }
    });
    setTimeout(()=>{
      this.addProductMessage=undefined;
    },3000);
  }
}
