import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = () => {

  const sellerService = inject(SellerService);
  if(sellerService.isSellerLoggedIn){
    return true;
  }else{
    inject(Router).navigate(['/']);
    return false;
  }
};
