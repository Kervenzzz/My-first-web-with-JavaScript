import { initHeader } from './header.js';
import { loadProductFetch } from '../data/products-data.js';
import { orders } from '../data/order-data.js';
//import  './exercise.js';

initHeader();

const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const producId = url.searchParams.get('productId')
console.log(orderId)
console.log(producId)





