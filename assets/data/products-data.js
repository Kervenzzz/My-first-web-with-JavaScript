import { tofixedmoney } from "../js/utiles/money.js";

class Product {
    id;
    image;
    name;
    rating;
    priceCent;

    constructor(productDetails){
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCent = productDetails.priceCent
    }

    getPrice () {
        return `$${ tofixedmoney(this.priceCent) }`
    }

    getStarURL () {
        return `assets/image/rating-${this.rating.stars * 10}.png`
    }


}

export let products = [
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
    }
].map((productDetails) => {
    return new   Product(productDetails);
});

export function findProduct (producId) {
    const product = products.find(product => product.id === producId );
    return  product;
}


