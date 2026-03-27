
import { cart, removeToCart, updateDeliveryOptions,  updateCartQuantity } from '../../data/cart-data.js';
import { tofixedmoney  } from '../utiles/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, findDeliveryOption } from '../../data/deliveryOptions.js';
import { paymentSummary } from './paymentSummary.js';
import {  findProduct } from '../../data/products-data.js';



export function renderCart () {
    let ProductsCheckoutHTML = '';

    

    cart.forEach((cartItem) => {
        const { productId, quantity, deliveryOptionsId } = cartItem;
        const product = findProduct(productId);
        
        
        const deliveryOption = findDeliveryOption(deliveryOptionsId);
        const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'day').format('DD, MMM YYYY')
        ProductsCheckoutHTML += `
            <div class="cart-item js-cart-item" data-product-id="${productId}">

                <div class="left">
                    <p>Delivery date: <span>  ${deliveryDate}</span></p>

                    <div class="cart-item-container">
                        <div class="item-image-container">
                            <img src="${product.image}" alt="Wireless Headphones" class="item-image">
                        </div>

                        <div class="item-content">
                            <h3>${product.name}</h3>
                            <p class="price">${product.getPrice() }</p>
                            <p class="js-quantity">Quantity: ${quantity}</p>
                            <div class="cart-action">
                                <span class="js-update-btn" >Update </span>
                                <div class="new-quantity-container is-hidden">
                                    <input class=" new-quantity-input js-new-quantity" type="number" value="${quantity}" />
                                    <button type="sumbit" class="save-quantity-btn js-save-quantity ">Save</button>
                                </div>
                                <span class="js-remove-to-cart" >Delete</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="delivery-options">
                    <h3 class="section-subtitle">Choose Delivery Option</h3>
                    
                    ${deliveryOptionsHTML(productId, deliveryOptionsId)}

                </div>
            </div>
        `
    });

    const cartContainer = document.querySelector('.Cart-checkout-container');
    cartContainer.innerHTML = ProductsCheckoutHTML;



    cartContainer.addEventListener('click', (e) => {

        const cartItem = e.target.closest('.js-cart-item');
        if(!cartItem){
            return;
        };
        const newQuantityContainer = cartItem.querySelector('.new-quantity-container');
        const updateBtn = cartItem.querySelector('.js-update-btn');
        const id = cartItem.dataset.productId;

         if(e.target.matches('.js-update-btn')){
            showNewQuatity(e, newQuantityContainer);
        }else if(e.target.matches('.js-save-quantity')){
            updateCartQuantity(updateBtn,cartItem, newQuantityContainer);
        }else if (e.target.matches('.js-remove-to-cart')){
            removeToCart(id);
            paymentSummary();
            cartItem.remove()
        }
    });

    function showNewQuatity (e, newQuantityContainer ) {

        e.target.classList.add('is-hidden');
        newQuantityContainer.classList.remove('is-hidden');
      
      }
    
    

    function deliveryOptionsHTML (productId, deliveryOptionsId) {
        let deliveryOptionsHTML = ''
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            let { deliveryDays, priceCent, id} = deliveryOption ;
            let isCheked = deliveryOptionsId === id ? 'checked' : '';
            let priceString = priceCent === 0 ? 'FREE Shipping' : `$${tofixedmoney(priceCent)}`
            let deliveryDate = today.add(deliveryDays, 'day').format('DD, MMM YYYY');
    
            deliveryOptionsHTML += `
                <div class="delivery-option js-delivery-option" 
                data-delivery-option-id="${id}"
                data-product-id="${productId}">
                    <input type="radio" id="standard" name="delivery-${productId}" value="standard" ${isCheked}>
                    <label for="standard">
                        <div class="option-header">
                            <span class="option-title">${deliveryDate}</span>
                            <span class="option-price">${priceString}</span>
                        </div>
                    </label>
                </div>
            `
            
        });
        return deliveryOptionsHTML;
        
    };
    document.querySelectorAll('.js-delivery-option').forEach((option) => {
        option.addEventListener('click', () =>{
            let { deliveryOptionId, productId } = option.dataset;
            updateDeliveryOptions(productId, deliveryOptionId);
            renderCart()
        })
    });

    paymentSummary()

};