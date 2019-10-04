import { fetchData } from './fetchData'

describe('api utils', () => {
    it('fetchData', () => {
        expect(fetchData({ path : 'live', params: { currencies: 'EUR' }})).toBeDefined();
    })
})