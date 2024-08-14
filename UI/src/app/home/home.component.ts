import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
	popularProducts:undefined|Product[];
	trendyProducts:undefined|Product[];
	mobilePhones:undefined|Product[];
	electronics:undefined|Product[];
  constructor(private productService:ProductService,private router:Router){}

  ngOnInit():void{
    // this.seller.removeSeller();
    this.productService.popularProducts("5").subscribe((data)=>{
      this.popularProducts=data;
    });

    this.productService.trendyProducts("8").subscribe((data)=>{
      this.trendyProducts=data;
    })
    this.productService.productsByCategory("Mobile Phone").subscribe((data)=>{
      this.mobilePhones=data;
    })
    this.productService.productsByCategory("Electronics").subscribe((data)=>{
      this.electronics=data;
    })
  }

}
