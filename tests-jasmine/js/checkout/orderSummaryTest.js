import { renderCart } from "../../../assets/js/checkout/orderSummary.js";
import { cart, laodFromStorage} from "../../../assets/data/cart-data.js";
import { products, loadProductsBackend } from "../../../assets/data/products-data.js";

describe('test suite: renderOrderSummary', () => {

    
    beforeAll((done) => {
        loadProductsBackend(() => {
            done()
        })
    })

    it('display the cart', () => {
        let container = document.querySelector('.js-test-container');
        container.innerHTML = `<div class='Cart-checkout-container'></div>`
        ;
        const paymentSummaryContainer = document.querySelector('.js-test-payment-summary');
        paymentSummaryContainer.innerHTML = `
            <div class="js-payment-summary"></div>
        `
            
        
        
         
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : products[3].id,
                quantity : 3,
                deliveryOptionsId: '1'
            }])
        });

        laodFromStorage();

        
        renderCart();
    })
} )