export function tofixedmoney (priceCent){
    return (Math.round(priceCent) / 100).toFixed(2)
}