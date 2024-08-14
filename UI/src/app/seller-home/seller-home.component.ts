import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
productList:undefined|Product[];
productMessage:undefined|string;
deleteIcon=faTrash;
editIcon=faEdit;
  constructor(private productService:ProductService){}

  ngOnInit():void{
   this.list();
  }
  deleteProduct(id:string){
    this.productService.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product deleted successfully";
        this.list();
      }
    });
    setTimeout(()=>{
      this.productMessage=undefined;
    },3000);
  }
  list(){
    this.productService.productList().subscribe((result)=>{
      if(result){
        this.productList=result;
      }
    })
  }
}
