import { initHeader } from '../js/header.js';
import { renderCart } from './checkout/orderSummary.js';
import { loadProductsBackend } from '../data/products-data.js';
//import '../data/cartDataClass.js'
//import '../data/backendPractice.js'

initHeader();
loadProductsBackend(() => {
    renderCart();

})







