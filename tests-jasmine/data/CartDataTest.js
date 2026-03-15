import { addToCart, cart, laodFromStorage } from "../../assets/data/cart-data.js";



describe('test suite: addtoCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : '9f260fc6-1256-4c13-adb7-7b3b5877f321' ,
                quantity : 3,
                deliveryOptionsId: '1'
              }

            ])
        });
        laodFromStorage();
        addToCart('9f260fc6-1256-4c13-adb7-7b3b5877f321',1);

        expect(cart.length).toEqual(1)

        expect(cart[0].quantity).toEqual(4)
    })
})

describe('test suite: addToCart ', () => {

    it('add a new product to the cart', () =>{

        spyOn(localStorage, 'setItem'); 
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([])
        }); 

        laodFromStorage();
        addToCart('16952997-0202-40a8-a0fe-c30ba41da213')
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('16952997-0202-40a8-a0fe-c30ba41da213');
        expect(cart[0].quantity).toEqual(1);



    });
})