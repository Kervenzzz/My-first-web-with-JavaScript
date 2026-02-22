import { initHeader } from './header.js';

initHeader();

export let cart = [];

export function addToCart (productId) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (cartItem.id === productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      cart.push({
        id: productId,
        quantity: 1
      });
    }
  };