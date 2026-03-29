import { tofixedmoney } from "../js/utiles/money.js";

class Product {
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productDetails){
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents
    }

    getPrice () {
        return `$${ tofixedmoney(this.priceCents) }`
    }

    getStarURL () {
        return `images/ratings/rating-${this.rating.stars * 10}.png`
    }

    extraInfo(){
        return ''
    }

};

class Clothing extends Product {
    sizeChartlink;

    constructor(productDetails){
        super(productDetails);
        this.sizeChartlink = productDetails.sizeChartlink;
    }

    extraInfo() {
        return `
            <a href="${this.sizeChartlink}" target='blank' class="product-type">Size Chart</a>
        `
    }
    
};

export let products = [];

export function loadProductFetch () {
    let promise = fetch('https://supersimplebackend.dev/products').then((response) => {
        return response.json()
    }).then((value) => {
        products = value.map((productDetails) => {
            if(productDetails.type === 'clothing'){
                return new Clothing(productDetails)
            }
            return new Product(productDetails)
        });
    });

    console.log('load product')

    return promise
} 

/*
loadProductFetch().then(() => {

})
*/




export function loadProductsBackend (fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {

        products = JSON.parse(xhr.response).map((productDetails) => {
            if(productDetails.type === 'clothing'){
                return new Clothing(productDetails)
            }
            return new Product(productDetails)
        });

        fun()
    })

    xhr.open('GET', 'https://supersimplebackend.dev/products');
    xhr.send();
    
}




/*export let products = [
    {
        id : '57f5e7d2-e5e0-40af-a5ab-99693f3dabc4',
        image : "assets/image/laptop1.jpeg",
        name : 'Gaming Laptop',
        rating : {
            stars : '5' ,
            count : '120'
        },
        priceCent : '129999',
    }, {
        id : '9f260fc6-1256-4c13-adb7-7b3b5877f321',
        image : "assets/image/canon1.jpeg",
        name : 'Camara Ultra Angular',
        rating : {
            stars : '4' ,
            count : '808' 
        },
        priceCent : '83000',
    },{
        id : '58b07f4f-0dea-4721-bacf-a31a9534a315',
        image : "assets/image/drone1.jpeg",
        name : 'DJI mini Drone fast',
        rating : {
            stars : '3.5' ,
            count : '1399'
        },
        priceCent : '65000',
    },{
        id : '16952997-0202-40a8-a0fe-c30ba41da213',
        image : "assets/image/jbl1.jpeg",
        name : 'Good sound JBL',
        rating : {
            stars : '4.5' ,
            count : '1200'
        },
        priceCent : '43599',
    },{
        id : '16952997-0202-40a8-a0fe-a41da213',
        image : "assets/image/t-shirt.jpg",
        name : 'T-shirt white',
        rating : {
            stars : '4.5' ,
            count : '330'
        },
        priceCent : '9999',
        type : 'clothing',
        sizeChartlink : 'assets/image/size-chart-link.webp'
    },{
        id : '16952997-0202-40a8-a0fe-a41da213',
        image : "assets/image/tshirt.jpg",
        name : 'Cool Tshirt',
        rating : {
            stars : '5' ,
            count : '530'
        },
        priceCent : '14999',
        type : 'clothing',
        sizeChartlink : 'assets/image/size-chart-link.webp'
    }
].map((productDetails) => {
    if(productDetails.type === 'clothing'){
        return new Clothing(productDetails)
    }
    return new   Product(productDetails);
});*/

export function findProduct (producId) {
    const product = products.find(product => product.id === producId );
    return  product;
}


