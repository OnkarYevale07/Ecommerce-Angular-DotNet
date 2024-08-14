import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,RouterModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData:undefined|Product;
  productMessage:undefined|string;
  constructor(private route:ActivatedRoute,private productService:ProductService){}

  ngOnInit():void{
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.productService.getProduct(productId).subscribe((data)=>{
      this.productData=data;
    })
  }

  submit(data:Product){
    if(this.productData){
      data.id=this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has updated";
      }
    });
    setTimeout(()=>{
      this.productMessage=undefined;
    },3000);
  }
}
