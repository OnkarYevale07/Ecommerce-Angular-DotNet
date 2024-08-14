import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productData:undefined|Product;
  productQuantity:number=1;
  removeCart=false;
  cartData:Product|undefined;
  constructor(private activeRoute:ActivatedRoute,private productService:ProductService){}
  ngOnInit():void{
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.productService.getProduct(productId).subscribe((result)=>{
      this.productData=result;

      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:Product)=>productId==item.id.toString());
        if(items.length){
          this.removeCart=true;
        }else{
          this.removeCart=false;
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
        this.productService.cartData.subscribe((result)=>{
         let items =  result.filter((item:Product)=>productId?.toString()===item.productId?.toString());
         if(items.length){
          this.cartData=items[0];
          this.removeCart=true;
         }
        })
      }
    })
  }
  handleQuantity(val:string){
    if(this.productQuantity<20&&val==='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1&&val==='min'){
      this.productQuantity-=1;
    }
  }
  addToCart(){
    if(this.productData){
      this.productData.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){
        this.productService.localAddToCart(this.productData);
        this.removeCart=true;
      }else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData:Cart ={
          ...this.productData,userId,productId:this.productData.id
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.productService.getCartList(userId);
            this.removeCart=true;
          }
        })
      }
    }
  }

  removeToCart(productId:string){
    if(!localStorage.getItem('user')){
    this.productService.removeItemFromCart(productId);
    }else{
      let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
      this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((result)=>{
        if(result){
          this.productService.getCartList(userId);
        }
      })
      this.removeCart=false;
    }
  }

}
