import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType:string='default';
  sellerName:string='';
  searchResult:undefined|Product[];
  userName:string='';
  cartItems=0;
  constructor(private route:Router,private productService:ProductService){}

  ngOnInit():void{
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&&val.url.includes('seller')){
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
          this.menuType="seller";
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName=userData.name;
          this.menuType='user';
          this.productService.getCartList(userData.id)
        }else{
          this.menuType="default";
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items)=>{
      this.cartItems=items.length;
    })
  }
  sellerLogout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.productService.cartData.emit([]);
  }
  searchProduct(query:KeyboardEvent){
    if(query){
      const element=query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe((data)=>{
        if(data.length>5){
          data.length=5;
        }
        this.searchResult=data;
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined;
  }
  searchSubmit(val:string){
    this.route.navigate([`search/${val}`]);
  }
  redirectToDetails(id:string){
    this.route.navigate(['/details/'+id]);
    this.searchResult=[]
  }
}