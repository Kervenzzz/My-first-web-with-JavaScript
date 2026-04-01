
export const deliveryOptions = [{

    id : '1',
    deliveryDays : 7,
    priceCent : 0
    }, {
    id : '2',
    deliveryDays : 3,
    priceCent : 499

    },  {
    id : '3',
    deliveryDays : 1,
    priceCent : 999
    }
];

export function findDeliveryOption(deliveryOptionId) {
    const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
    return deliveryOption;
}