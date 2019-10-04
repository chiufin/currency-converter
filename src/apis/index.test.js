import { getCurrencyList, getRateComparedUSD, getRate } from '.'
// import { fetchData } from './fetchData'

// const fetchData = jest.fn().mockImplementation(() => Promise.resolve());
// jest.mock('./fetchData');

describe('apis', () => {
    it('getCurrencyList', async() => {
        await expect(getCurrencyList()).toBeDefined;
    });

    it('getRateComparedUSD', async() => {
        await expect(getRateComparedUSD()).toBeDefined;
    });

    // it('getRateComparedUSD', async() => {
    //     expect.assertions(1);
    //     await getRateComparedUSD('EUR');
    //     expect(fetchData).toBeCalled();
    // });

})

describe('getRate for different scenario', () => {
    it.each`
    from   | to
    ${'USD'}  | ${'EUR'}
    ${'EUR'}  | ${'EUR'}
    ${'TWD'}  | ${'EUR'}
    `('$from $to', async ({ from, to }) => {
        await expect(getRate(from, to)).toBeDefined;
    });
  });
