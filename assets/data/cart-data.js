import { paymentSummary } from "../js/checkout/paymentSummary.js";
import { products } from "./products-data.js";

export let cart;

laodFromStorage();

export function laodFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    product : products[3],
    quantity : 3,
    deliveryOptionsId: '1'
  }, {
    product : products[1],
    quantity : 3,
    deliveryOptionsId: '3'
  }];
}

function saveCartToStorage () {
  localStorage.setItem('cart',JSON.stringify(cart))
}


export function addToCart (btnProductId, productQuantity) {
    // comprobando si existe el producto en el cart
    let productMatching;

    cart.forEach((productAndQuantity) => {
      let productId = productAndQuantity.product.id;
      if(btnProductId === productId){
        productMatching = productAndQuantity;
      }
    });
    
    // si existe en el cart  incrementamos la cantidad
    if(productMatching){
      productMatching.quantity += productQuantity;
    }else{
      // si no existe en el cart, lo buscamos en products y lo agregamos al cart
      let productFind
      products.forEach((product) => {
        if(btnProductId === product.id){
          productFind = product;
        }
      })
      cart.push({
        product : productFind,
        quantity : productQuantity || 1 ,
        deliveryOptionsId: '1'
      })
    };
    saveCartToStorage()
    
};

export function removeToCart (productId) {

  let newCart = [];
  cart.forEach((productAndQuantity) => {
    let productCartId = productAndQuantity.product.id
    if(productId !== productCartId){
      newCart.push(productAndQuantity)
    }
  });

  cart = newCart ;
  saveCartToStorage();


}

export function updateDeliveryOptions (productId, deliveryOptionsId){
  let productMatching;

  cart.forEach((productAndQuantity) => {
    let cartProductId = productAndQuantity.product.id;
    if(productId === cartProductId){
      productMatching = productAndQuantity;
    }
  });
  productMatching.deliveryOptionsId = deliveryOptionsId;
  saveCartToStorage()
}
export function findCartOption (cartId) {
  const CartOption = cart.find( Option => Option.product.id === cartId  );
  return CartOption
}


export function updateCartQuantity (updateBtn, cartItem, newQuantityContainer) {

  const texQuatity = cartItem.querySelector('.js-quantity');
  const id = cartItem.dataset.productId;
  const newQuantity = cartItem.querySelector('.js-new-quantity').value ;
  console.log(newQuantity)
  const cartOption = findCartOption(id);
  cartOption.quantity = Number(newQuantity) ;

  texQuatity.textContent = newQuantity
  newQuantityContainer.classList.toggle('is-hidden');
  updateBtn.classList.toggle('is-hidden');
  saveCartToStorage();
  paymentSummary();
}