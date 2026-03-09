import { tofixedmoney } from "../js/utiles/money.js";

describe('test suite: toFixedMoney', () => {
    it('convert cent into dollars', () => {
        expect(tofixedmoney(2095)).toEqual('20.95')
    });
    it('work with 0', () => {
        expect(tofixedmoney(0)).toEqual('0.00')
    });
    it('work to largest decimale like 2000.00005', () => {
        expect(tofixedmoney(2000.6)).toEqual('20.01')
    });
})