import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = false;
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(data:SignUp){
    this.http.post('https://localhost:7218/api/seller',data,{observe:'response'}).subscribe((result)=>{
      this.isSellerLoggedIn = true;
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
    });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn=true;
      this.router.navigate(['seller-home']);
    }
  }
  removeSeller(){
    if(localStorage.getItem('seller')){
      localStorage.removeItem('seller');
      this.isSellerLoggedIn=false;
      this.router.navigate(['']);
    }
  }
  userLogin(data:Login){
    this.http.get(`https://localhost:7218/api/Seller/sellerLogin?email=${data.email}&password=${data.password}`,{
      observe:'response'
    }).subscribe((result:any)=>{
      if(result&&result.body&&result.body.length){
        this.isSellerLoggedIn = true;
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      }else{
        this.isLoginError.emit(true);
      }
    })
  }
}
