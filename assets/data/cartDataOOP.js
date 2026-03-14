import { paymentSummary } from "../js/checkout/paymentSummary.js";
import { products } from "./products-data.js";


function Cart (cartKey) {

    const cart = {
        cartItem: undefined,
    
        laodFromStorage() {
            this.cartItem = JSON.parse(localStorage.getItem(cartKey)) || [{
                product : products[3],
                quantity : 3,
                deliveryOptionsId: '1'
            }, {
                product : products[1],
                quantity : 3,
                deliveryOptionsId: '3'
            }];
        },
    
        saveCartToStorage () {
            localStorage.setItem(cartKey,JSON.stringify(this.cartItem))
        },
    
        addToCart (btnProductId, productQuantity) {

            if(!productQuantity){
                productQuantity = 1
            }
            // comprobando si existe el producto en el cart
            let productMatching = this.findCartOption(btnProductId)
        
            
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
                this.cartItem.push({
                    product : productFind,
                    quantity : productQuantity  ,
                    deliveryOptionsId: '1'
                })
            };
            this.saveCartToStorage()
            
        },
    
        removeToCart (productId) {
    
            let newCart = [];
            this.cartItem.forEach((productAndQuantity) => {
                let productCartId = productAndQuantity.product.id
                if(productId !== productCartId){
                    newCart.push(productAndQuantity)
                }
            });
          
            this.cartItem = newCart ;
            this.saveCartToStorage();
          
        },
    
        findCartOption (cartId) {
            const CartOption = this.cartItem.find( Option => Option.product.id === cartId  );
            return CartOption
        },
    
        updateCartQuantity (updateBtn, cartItem, newQuantityContainer) {
    
            const texQuatity = cartItem.querySelector('.js-quantity');
            const id = cartItem.dataset.productId;
            const newQuantity = cartItem.querySelector('.js-new-quantity').value ;
            const cartOption = this.findCartOption(id);
            cartOption.quantity = Number(newQuantity) ;
          
            texQuatity.textContent = newQuantity
            newQuantityContainer.classList.toggle('is-hidden');
            updateBtn.classList.toggle('is-hidden');
            this.saveCartToStorage();
            paymentSummary();
        }
    
    
    };

    cart.laodFromStorage();

    return cart

};



const cart =  Cart('cartOOP');
const businessCart = Cart('businessCart');



businessCart.addToCart(products[0].id,32)

console.log(cart);
console.log(businessCart);



















