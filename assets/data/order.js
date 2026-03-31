export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order) {
    orders.unshift(order);
    saveOrderToStorage();
    console.log(orders)
};

function saveOrderToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders))
}
