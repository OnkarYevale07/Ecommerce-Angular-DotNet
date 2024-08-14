import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin = true;
  authError:string='';
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }
  login(data: SignUp): void {
    this.authError=''
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Incorrect Email or Password";
      }
    })
  }
  openLogin() {
    this.showLogin= true;
  }
  openSignUp() {
    this.showLogin= false;
  }
}
