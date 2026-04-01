import { initHeader } from './header.js';
import { orders } from '../data/order-data.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { tofixedmoney } from './utiles/money.js';
import { findProduct, loadProductFetch } from '../data/products-data.js';

initHeader();

async function displayOrder(params) {

        await loadProductFetch();

        renderOrder();

}       



function renderOrder() {
    
    if(orders.length === 0){
        document.querySelector('.js-empty-orders')
            .classList.toggle('is-hidden');
        return
    }
    

    let ordersHTML = '';

    orders.forEach(order => {
        const { products, id, orderTime, totalCostCents } = order;

        const datePlaced = dayjs(orderTime).format('MMMM D, YYYY');
        console.log(datePlaced);

        let productsHTML = ''

        products.forEach(productData => {
            const product = findProduct(productData.productId);
            const arrivingDate = dayjs(productData.estimatedDeliveryTime).format('MMMM DD');
            const { quantity } = productData;
            console.log(productData)

            const HTML = `

                <div class="order-item">
                    <div class="item-image">
                        <img src="${product.image}" alt="Product">
                    </div>
                    <div class="item-details">
                        <h3 class="item-name">${product.name}</h3>
                        <p class="item-delivery">Arriving on: <span class="item-delivery-span">${arrivingDate}</span></p>
                        <p class="item-quantity">Quantity: ${quantity}</p>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-primary">Buy Again</button>
                        <button class="btn btn-secondary">Track Package</button>
                    </div>
                </div>

            `
            productsHTML += HTML;
            

        })

        let HTML = `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-info">
                        <div class="order-meta">
                            <span class="order-label">Order Placed:</span>
                            <span class="order-date">${datePlaced}</span>
                        </div>
                        <div class="order-meta">
                            <span class="order-label">Order Total:</span>
                            <span class="order-total">$${tofixedmoney(totalCostCents)}</span>
                        </div>
                    </div>
                    <div class="order-id">
                        <span class="order-label">Order ID:</span>
                        <span class="order-number">${id}</span>
                    </div>
                </div>

                <div class="order-items">
                    ${productsHTML}
                </div>
            </div>
        `
        ordersHTML += HTML;
    });

    document.querySelector('#ordersContainer').innerHTML = ordersHTML;
}

displayOrder()