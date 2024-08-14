import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, Login, Product, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  showLogin:boolean=true;
  authError:string="";
  constructor(private userService:UserService,private productService:ProductService){}

  ngOnInit():void{
    this.userService.userAuthReload();
  }

  signUp(data:SignUp){
    this.userService.userSignUp(data);
  }
  login(data:Login){
   this.userService.userLogin(data);
   this.userService.invalidUserAuth.subscribe((result)=>{
    if(result){
      this.authError="Please enter valid user credentials";
    }else{
      this.localCartToRemoteCart();
    }
   })
  }
  openLogin(){
    this.showLogin=true;
  }
openSignUp(){
  this.showLogin=false;
}
localCartToRemoteCart(){
  let data = localStorage.getItem('localCart');
  let user = localStorage.getItem('user');
  let userId = user && JSON.parse(user).id;
  if(data){
    let cartDataList:Product[]=JSON.parse(data)
    cartDataList.forEach((product:Product,index) => {
      let cartData:Cart={
        ...product,
        productId:product.id,
        userId
      }
      delete cartData.id;
      setTimeout(()=>{
        this.productService.addToCart(cartData).subscribe((result)=>{
          if(result){
          }
        })
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart');
        }
      },500);
    });
  }
setTimeout(()=>{
  this.productService.getCartList(userId);
},2000);
}
}
