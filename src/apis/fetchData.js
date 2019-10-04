export const fetchData = async ({path = '', params}) => {
    let url = `http://apilayer.net/api/${path}?access_key=${process.env.REACT_APP_API_CURRENCY_KEY}`
    if(params){
        for(let key in params){
            url+= `&${key}=${params[key]}`
        }
    }
    const res = await fetch(url)
    return res.json()
}