import React, { useState, useEffect } from 'react';

function CurrencyBox() {
    const [list, setList] = useState([]);

    useEffect(() => {
        const getCurrencyList = async () => {
            const listUrl = `http://apilayer.net/api/list?access_key=${process.env.REACT_APP_API_CURRENCY_KEY}`
            const res = await fetch(listUrl)
            const json = await res.json()
            const currencies = []
            for(let key in json.currencies){
                currencies.push(key)
            }
            setList(currencies)
        }
        getCurrencyList()
    }, [])
  return (
    <div>
        <select>
            {list.map(i => <option key={i}>{i}</option>)}
        </select>
    </div>
  );
}

export default CurrencyBox;
