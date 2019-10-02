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


export const getRate = (from, to) => 
    fetchData({ path : 'live', params: { source: from, currencies: to }})
    .then(json => json.quotes[`${from}${to}`])
    