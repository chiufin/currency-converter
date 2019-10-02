import React, { useState, useEffect } from 'react';
import { getCurrencyList, getRate } from './apis';

function CurrencyBox({from='USD', to='EUR'}) {
    const [fromCurrency, setFromCurrency] = useState(from);
    const [toCurrency, setToCurrency] = useState(to);
    const [rate, setRate] = useState(1);
    const [reversedRate, setReversedRate] = useState(1); 
    const [list, setList] = useState([]);

    useEffect(() => {
        getCurrencyList()
        .then( list => setList(list) )
        
        getRate(from, to)
        .then( rate => {
            setRate(rate)
            setReversedRate(rate.toFixed(6))
        })
    }, [from, to])

    const changeCurrency = ({ target : { value }}, whichCurrency) => {
        switch(whichCurrency){
            case 'from':
                setFromCurrency(value);
                break;
            case 'to':
                setToCurrency(value);
                break;
            default:
                break;
        }
    }
  return (
    <>
        <div>
            <p>1 {fromCurrency}= {rate} {toCurrency}</p>
            <select value={ fromCurrency }
                    onChange={e =>changeCurrency( e, 'from')}>
                {list.map(each =>
                    <option key={each}>{each}</option>
                )}
            </select>
        </div>
        <div>
            <p>1 {toCurrency}= {reversedRate} {fromCurrency}</p>
            <select value={ toCurrency } 
                    onChange={e =>changeCurrency( e, 'to')}>
                    {list.map(each =>
                        <option key={each}>{each}</option>
                    )}
            </select>
        </div>
    </>
  );
}

export default CurrencyBox;
