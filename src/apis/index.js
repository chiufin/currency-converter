const fetchData = async ({path = '', params}) => {
    let url = `http://apilayer.net/api/${path}?access_key=${process.env.REACT_APP_API_CURRENCY_KEY}`
    if(params){
        for(let key in params){
            url+= `&${key}=${params[key]}`
        }
    }
    const res = await fetch(url)
    return res.json()
}

export const getCurrencyList = () => 
    fetchData({ path : 'list'})
    .then(json => {
        let currencies = []
        for(let key in json.currencies){
            currencies.push(key)
        }
        return currencies
    })

export const getRateComparedUSD = to => 
    fetchData({ path : 'live', params: { currencies: to }})
    .then(json => json.quotes[`USD${to}`])

export const getRate = async(from, to) => {
    if(from === 'USD'){
        return getRateComparedUSD(to)
    }

    if(to === 'USD'){
        return getRateComparedUSD(from).then(
            rate => 1/rate
        )
    }

    if(from === to){
        return 1
    }

    //temp solutions, you compared to USD to get the convert data
    let fromRateComparedUSD = 1
    let toRateComparedUSD = 1
    //convert to USD
    await getRateComparedUSD(from).then(
        rate => fromRateComparedUSD = 1/rate
    )
    //USD to new currency
    await getRateComparedUSD(to).then(
        rate => toRateComparedUSD = rate
    )

    return fromRateComparedUSD * toRateComparedUSD
}
    