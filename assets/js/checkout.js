import { initHeader } from '../js/header.js';
import { renderCart } from './checkout/orderSummary.js';
import { loadProductsBackend } from '../data/products-data.js';
import { paymentSummary } from './checkout/paymentSummary.js';
import { loadCartBackend } from '../data/cart-data.js';

//import '../data/cartDataClass.js'
//import '../data/backendPractice.js'


Promise.all([
    new Promise((resolve) => {
        loadProductsBackend(() => {
            resolve('hola')
        })

        console.log('load product')
    }),

    new Promise((resolve) => {
        loadCartBackend(() => {
            resolve('Kervens')
        })
    })
]).then((value) => {

    renderCart();
    paymentSummary();

    console.log('render the HTML')
    console.log(value[1])
})


/*
new Promise((resolve) => {
    loadProductsBackend(() => {
        resolve()
    })
}).then(() => {
    renderCart();
    paymentSummary()
})
*/

/*
initHeader();
loadProductsBackend(() => {
    
   
    renderCart();
    paymentSummary()

})

*/





