import { paymentSummary } from "../js/checkout/paymentSummary.js";

export let cart;

laodFromStorage();

export function laodFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId :'9f260fc6-1256-4c13-adb7-7b3b5877f321',
    quantity : 3,
    deliveryOptionsId: '1'
  }, {
    productId :'58b07f4f-0dea-4721-bacf-a31a9534a315',
    quantity : 3,
    deliveryOptionsId: '3'
  }];
}

function saveCartToStorage () {
  localStorage.setItem('cart',JSON.stringify(cart))
}


export function addToCart (btnProductId, productQuantity) {
    // comprobando si existe el producto en el cart
    const cartMatching = findCartOption(btnProductId);

    // si existe en el cart  incrementamos la cantidad
    if(cartMatching){
      cartMatching.quantity += productQuantity;
    }else{
      // si no existe en el cart, lo buscamos en products y lo agregamos al cart
    
      cart.push({
        productId : btnProductId,
        quantity : productQuantity || 1 ,
        deliveryOptionsId: '1'
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

  productMatching.deliveryOptionsId = deliveryOptionsId;
  saveCartToStorage()
}

export function findCartOption (cartId) {
  const CartOption = cart.find( Option => Option.productId === cartId  );
  return CartOption
}


export function updateCartQuantity (updateBtn, cartItem, newQuantityContainer) {

  const texQuatity = cartItem.querySelector('.js-quantity');
  const id = cartItem.dataset.productId;
  const newQuantity = cartItem.querySelector('.js-new-quantity').value ;
  const cartOption = findCartOption(id);
  cartOption.quantity = Number(newQuantity) ;

  texQuatity.textContent = newQuantity
  newQuantityContainer.classList.toggle('is-hidden');
  updateBtn.classList.toggle('is-hidden');
  saveCartToStorage();
  paymentSummary();
}