import { renderCart } from "../../../assets/js/checkout/orderSummary.js";
import { laodFromStorage} from "../../../assets/data/cart-data.js";
import { products } from "../../../assets/data/products-data.js";

describe('test suite: renderOrderSummary', () => {
    it('display the cart', () => {
        let container = document.querySelector('.js-test-container');
        container.innerHTML = `<div class='Cart-checkout-container'></div>`
        ;
        console.log(container)
        
         
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                product : products[3],
                quantity : 3,
                deliveryOptionsId: '1'
            }])
        });

        laodFromStorage();
        renderCart();
    })
} )