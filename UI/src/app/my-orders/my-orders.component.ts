import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orderData:Order[]|undefined;
  constructor(private productService:ProductService){}

  ngOnInit():void{
    this.getOrderList();
  }
  cancelOrder(orderId:string|undefined){
    orderId && this.productService.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }
  getOrderList(){
    this.productService.orderList().subscribe((result)=>{
      this.orderData= result;
    })
  }
}
