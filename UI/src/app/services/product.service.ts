import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Product[]|[]>();
  constructor(private http:HttpClient) { }
  addProduct(data:Product){
    return this.http.post('https://localhost:7218/api/product',data);
  }
  productList(){
    return this.http.get<Product[]>('https://localhost:7218/api/product');
  }
  deleteProduct(id:string){
    return this.http.delete(`https://localhost:7218/api/product/${id}`);
  }
  getProduct(id:string){
    return this.http.get<Product>(`https://localhost:7218/api/product/${id}`);
  }
  updateProduct(product:Product){
    return this.http.put<Product>(`https://localhost:7218/api/product/${product.id}`,product);
  }
  popularProducts(limit:string){
    return this.http.get<Product[]>(`https://localhost:7218/api/product/getLimitedProducts?limit=${limit}`);
  }
  trendyProducts(limit:string){
    return this.http.get<Product[]>(`https://localhost:7218/api/product/getLimitedProducts?limit=${limit}`);
  }
  productsByCategory(category:string){
    return this.http.get<Product[]>(`https://localhost:7218/api/product/getProductsByCategory?category=${category}`);
  }
  searchProducts(query:string){
    return this.http.get<Product[]>(`https://localhost:7218/api/product?q=${query}`);
  }
  localAddToCart(data:Product){
    let cartData=[];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId:string){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:Product[]=JSON.parse(cartData);
      items = items.filter((item:Product)=>productId!==item.id);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData:Cart){
    return this.http.post('https://localhost:7218/api/cart',cartData);
  }
  getCartList(userId:string){
    return this.http.get<Product[]>('https://localhost:7218/api/cart?userId='+userId,{
      observe:"response"
    }).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    })
  }
  removeToCart(cartId:string){
    console.warn("removeTocart");
    return this.http.delete('https://localhost:7218/api/cart/deleteCart?id='+cartId);
  }
  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>('https://localhost:7218/api/cart?userId='+userData.id);
  }
  orderNow(data:Order){
    return this.http.post('https://localhost:7218/api/order',data);
  }
  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    console.warn(userStore);
    console.warn(userData);
    return this.http.get<Order[]>('https://localhost:7218/api/order/getOrderByUserId?userId='+userData.id);
  }
  deleteCartItems(cartId:string){
    return this.http.delete('https://localhost:7218/api/cart/deleteCart?id='+cartId,{observe:"response"}).subscribe((result)=>{
      if(result){
        this.cartData.emit([]);
      }
    })
  }
  cancelOrder(orderId:string){
    return this.http.delete('https://localhost:7218/api/order/deleteOrder?id='+orderId);
  }
}
