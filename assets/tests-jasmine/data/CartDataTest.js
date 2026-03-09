import { addToCart, cart, laodFromStorage } from "../../data/cart-data.js";

describe('test suite: addToCart ', () =>{

    it('add a new product to the cart', () =>{

        spyOn(localStorage, 'setItem'); 
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([])
        }); 

        laodFromStorage();
        addToCart('16952997-0202-40a8-a0fe-c30ba41da213')
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].product.id).toEqual('16952997-0202-40a8-a0fe-c30ba41da213');
        expect(cart[0].quantity).toEqual(1);



    })
})