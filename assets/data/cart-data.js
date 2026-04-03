import { paymentSummary } from "../js/checkout/paymentSummary.js";
import { renderCart } from "../js/checkout/orderSummary.js";

export let cart;

laodFromStorage();

export function laodFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId :'3ebe75dc-64d2-4137-8860-1f5a963e534b',
    quantity : 3,
    deliveryOptionId: '1'
  }, {
    productId :"8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    quantity : 3,
    deliveryOptionId: '3'
  }];
}

function saveCartToStorage () {
  localStorage.setItem('cart',JSON.stringify(cart))
}


export function addToCart (btnProductId, productQuantity) {

  if(!productQuantity){
    productQuantity = 1
  }
    // comprobando si existe el producto en el cart
    const cartMatching = findCartOption(btnProductId);

    // si existe en el cart  incrementamos la cantidad
    if(cartMatching){
      cartMatching.quantity += productQuantity;
    }else{
      // si no existe en el cart, lo buscamos en products y lo agregamos al cart
    
      cart.push({
        productId : btnProductId,
        quantity : productQuantity ,
        deliveryOptionId: '1'
      })
    };
    saveCartToStorage()
    
};

export function removeToCart (productId) {

  let newCart = [];
  cart.forEach((cartItem) => {
    const itemId = cartItem.productId
    if(productId !== itemId){
      newCart.push(cartItem)
    }
  });

  cart = newCart ;
  saveCartToStorage();


}

export function updateDeliveryOptions (productId, deliveryOptionsId){
  let productMatching = findCartOption(productId)

  productMatching.deliveryOptionId = deliveryOptionsId;
  saveCartToStorage()
}

export function findCartOption (cartId) {
  const CartOption = cart.find( Option => Option.productId === cartId  );
  return CartOption
}


export function updateCartQuantity (updateBtn, cartItem, newQuantityContainer) {


  const id = cartItem.dataset.productId;
  const newQuantity = cartItem.querySelector('.js-new-quantity').value ;
  const cartOption = findCartOption(id);
  cartOption.quantity = Number(newQuantity) ;
  newQuantityContainer.classList.toggle('is-hidden');
  updateBtn.classList.toggle('is-hidden');
  saveCartToStorage();
  renderCart()
  paymentSummary();
}




export function loadCartBackend (fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {

      console.log(xhr.response)
      fun()
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();

};


export async function loadCartFetch() {

  const request = await fetch('https://supersimplebackend.dev/cart');
  const cart = await request.text();
  console.log(cart)

}