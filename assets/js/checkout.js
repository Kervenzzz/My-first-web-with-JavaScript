import { renderCart } from './checkout/orderSummary.js';
import { loadProductFetch } from '../data/products-data.js';
import { paymentSummary } from './checkout/paymentSummary.js';
import { loadCartFetch } from '../data/cart-data.js';

//import '../data/cartDataClass.js'
//import '../data/backendPractice.js'


async function loadPage() {

    try {
        await Promise.all([loadProductFetch(), loadCartFetch()])
        
    } catch(error) {
        console.log(error)
        console.log('somthing work wrong. please try later.')
    }
    
    renderCart();
    paymentSummary();
    console.log('display the page')

}

loadPage();




/*

Promise.all([
    loadProductFetch(),

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
*/

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





