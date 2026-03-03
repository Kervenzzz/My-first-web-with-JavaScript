
import { cart, removeToCart, updateDeliveryOptions } from '../../data/cart-data.js';
import { tofixedmoney  } from '../utiles/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';


export function renderCart () {
    let ProductsCheckoutHTML = '';

    cart.forEach((cartProductAndQuantity) => {
        let { product, quantity, deliveryOptionsId } = cartProductAndQuantity;
        let id = product.id;
        const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionsId);
        const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'day').format('DD, MMM YYYY')
        ProductsCheckoutHTML += `
            <div class="cart-item">

                <div class="left">
                    <p>Delivery date: <span>  ${deliveryDate}</span></p>

                    <div class="cart-item-container">
                        <div class="item-image-container">
                            <img src="${product.image}" alt="Wireless Headphones" class="item-image">
                        </div>

                        <div class="item-content">
                            <h3>${product.name}</h3>
                            <p class="price">$${tofixedmoney(product.priceCent)  }</p>
                            <p>Quantity: ${quantity}</p>
                            <div class="cart-action">
                                <span class="js-update-to-cart">Update</span>
                                <span class="js-remove-to-cart" data-product="${id}">Delete</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="delivery-options">
                    <h3 class="section-subtitle">Choose Delivery Option</h3>
                    
                    ${deliveryOptionsHTML(id, deliveryOptionsId)}

                </div>
            </div>
        `
    });

    let cartContainer = document.querySelector('.Cart-checkout-container');
    cartContainer.innerHTML = ProductsCheckoutHTML;
    
    let deleteCartBtns = document.querySelectorAll('.js-remove-to-cart');
    deleteCartBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            console.log(btn)
            let id = btn.dataset.product;
            removeToCart(id);
            renderCart()
        })
    });

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
    })


};