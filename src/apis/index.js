export const getCurrencyList = async () => {
    const url = `http://apilayer.net/api/list?access_key=${process.env.REACT_APP_API_CURRENCY_KEY}`
    const res = await fetch(url)
    const json = await res.json()
    const currencies = []
    for(let key in json.currencies){
        currencies.push(key)
    }
    return currencies
}