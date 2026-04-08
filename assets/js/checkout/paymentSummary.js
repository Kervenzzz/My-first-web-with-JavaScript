import { cart } from "../../data/cart-data.js";
import { findDeliveryOption } from "../../data/deliveryOptions.js";
import { tofixedmoney } from "../utiles/money.js";
import { findProduct } from "../../data/products-data.js";
import { addOrder } from "../../data/order-data.js";

export function paymentSummary () {
    let paymentSummaryHTML = '';
    let itemsQuantity = 0;
    let subtotalCents = 0;
    let shippingCents = 0;
    let totalBeforeTaxCents = 0;
    let taxCents = 0;
    let orderTotalCents = 0 ;
    cart.forEach((cartItem) => {
        const { quantity, deliveryOptionId, productId } = cartItem;
        const deliveryOptions = findDeliveryOption(deliveryOptionId);
        const product = findProduct(productId)

        itemsQuantity += quantity;
        subtotalCents += product.priceCents * quantity;
        shippingCents += deliveryOptions.priceCent
    });
    totalBeforeTaxCents = subtotalCents + shippingCents;
    taxCents = totalBeforeTaxCents * 0.1;
    orderTotalCents = totalBeforeTaxCents + taxCents ;
    
    paymentSummaryHTML =`
        
        <div class="order-summary">
            <h2 class="section-title">Order Summary</h2>

            <div class="summary-section">
                <div class="summary-row">
                    <span class="summary-label">Items:</span>
                    <span class="summary-value">${itemsQuantity}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Subtotal:</span>
                    <span class="summary-value">$${tofixedmoney(subtotalCents)}</span>
                </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-section">
                <div class="summary-row">
                    <span class="summary-label">Shipping & Handling:</span>
                    <span class="summary-value">$${tofixedmoney(shippingCents)}</span>
                </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-section">
                <div class="summary-row">
                    <span class="summary-label">Total Before Tax:</span>
                    <span class="summary-value">$${tofixedmoney(totalBeforeTaxCents)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Estimated Tax (10%):</span>
                    <span class="summary-value">$${tofixedmoney(taxCents)}</span>
                </div>
            </div>

            <div class="summary-divider total-divider"></div>

            <div class="summary-section total">
                <div class="summary-row total-row">
                    <span class="summary-label total-label">Order Total:</span>
                    <span class="summary-value total-value">$${tofixedmoney(orderTotalCents)}</span>
                </div>
            </div>

            <button class="btn-place-order js-place-order">Place Your Order</button>

            <div class="secure-checkout">
                <i class="ti ti-lock"></i>
                <span>Secure Checkout</span>
            </div>
        </div>  
    
    `
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    

    const btnPlaceOrder = document.querySelector('.js-place-order');

    disabledBtn(btnPlaceOrder)

    btnPlaceOrder.addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders',{
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });

            const order = await response.json();
            addOrder(order);
            window.location.href = 'orders.html';
        
        }   catch(error) {
            console.log('unexpected error. Please try agaim later')
        };

    })

}

function disabledBtn(btn){ 
    if(cart.length === 0 ){
        btn.disabled = true;
    }
}
