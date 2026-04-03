import { initHeader } from './header.js';
import { loadProductFetch, findProduct } from '../data/products-data.js';
import { orders } from '../data/order-data.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
//import  './exercise.js';

initHeader();

async function displayProduct() {
    await loadProductFetch();
    renderTrackProduct()
}

function renderTrackProduct() {

    const url = new URL(window.location.href);

    const orderId = url.searchParams.get('orderId');
    const producId = url.searchParams.get('productId')
    console.log(orderId)
    console.log(producId)


    const order = orders.find(order => order.id === orderId);
    const orderProducts = order.products;
    const orderProduct = orderProducts.find(p => p.productId === producId);
    const product = findProduct(producId);
    const arrivingDate = dayjs(orderProduct.estimatedDeliveryTime).format('MMMM DD')




    const HTML = `

        <div class="tracking-card">
            <div class="tracking-header">
                <div class="tracking-info">
                    <div class="tracking-meta">
                        <span class="tracking-label">Order ID:</span>
                        <span class="tracking-value">${orderId}</span>
                    </div>
                    <div class="tracking-meta">
                        <span class="tracking-label">Status:</span>
                        <span class="tracking-status in-transit">In Transit</span>
                    </div>
                </div>
                <div class="tracking-date">
                    <span class="tracking-label">Expected Delivery:</span>
                    <span class="tracking-value">${arrivingDate}</span>
                </div>
            </div>

            <div class="tracking-product">
                <div class="image-container">
                    <img src="${product.image}" class="product-image">
                </div>
                
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-quantity">Quantity: ${orderProduct.quantity}</p>
                </div>
            </div>

            <div class="tracking-timeline">
                <div class="timeline-item completed">
                    <div class="timeline-marker">
                        <i class="ti ti-check"></i>
                    </div>
                    <div class="timeline-content">
                        <h4 class="timeline-title">Prepared</h4>
                    </div>
                </div>

                <div class="timeline-item active">
                    <div class="timeline-marker">
                        <i class="ti ti-truck-delivery"></i>
                    </div>
                    <div class="timeline-content">
                        <h4 class="timeline-title">Shipped</h4>
                        </p>
                    </div>
                </div>

                <div class="timeline-item pending">
                    <div class="timeline-marker">
                        <i class="ti ti-package"></i>
                    </div>
                    <div class="timeline-content">
                        <h4 class="timeline-title">Delivered</h4>
                    </div>
                </div>
            </div>
        </div>

    `


    document.querySelector('#trackingContainer').innerHTML = HTML;
};

displayProduct()

