import { initHeader } from '../js/header.js';
import { products } from '../data/products-data.js'
import { cart } from '../data/cart-data.js'

initHeader();

let ProductsCheckoutHTML = '';



cart.forEach((cartProductAndQuantity) => {
  let { product, quantity } = cartProductAndQuantity
  ProductsCheckoutHTML += `
    <div class="cart-item">

        <div class="left">
            <p>Delivery date: <span>Feb 15, 2026</span></p>

            <div class="cart-item-container">
                <div class="item-image-container">
                    <img src="${product.image}" alt="Wireless Headphones" class="item-image">
                </div>

                <div class="item-content">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.priceCent / 100}</p>
                    <p>Quantity: ${quantity}</p>
                    <div class="cart-action">
                        <span>Update</span>
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="delivery-options">
            <h3 class="section-subtitle">Choose Delivery Option</h3>
            
            <div class="delivery-option">
                <input type="radio" id="standard" name="delivery" value="standard" checked>
                <label for="standard">
                    <div class="option-header">
                        <span class="option-title">Friday, February 20</span>
                        <span class="option-price">FREE Shipping</span>
                    </div>
                </label>
            </div>

            <div class="delivery-option">
                <input type="radio" id="express" name="delivery" value="express">
                <label for="express">
                    <div class="option-header">
                        <span class="option-title">Monday, February 16</span>
                        <span class="option-price">$9.99 - Shipping</span>
                    </div>
                </label>
            </div>

            <div class="delivery-option">
                <input type="radio" id="overnight" name="delivery" value="overnight">
                <label for="overnight">
                    <div class="option-header">
                        <span class="option-title">Thursday, February 12</span>
                        <span class="option-price">$24.99 - Shipping</span>
                    </div>
                </label>
            </div>
        </div>
    </div>
  `


});
document.querySelector('.Cart-checkout-container').innerHTML = ProductsCheckoutHTML;
//console.log(ProductsCheckoutHTML)