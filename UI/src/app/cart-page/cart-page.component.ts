import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, PriceSummary } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartData: Cart[] | undefined;
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    deliveryFee: 0,
    total: 0,
  };
  constructor(private productService: ProductService,private router:Router) {}

  ngOnInit(): void {
this.loadDetails();
  }
  loadDetails(){
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.deliveryFee = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;
      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
    });
  }
  checkout(){
    this.router.navigate(['/checkout']);
  }
  removeToCart(cartId:string|undefined){
    cartId && this.cartData && this.productService.removeToCart(cartId).subscribe((result)=>{
      this.loadDetails();
    })
  }
}
