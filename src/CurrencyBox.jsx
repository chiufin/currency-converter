import React, { useState, useEffect } from 'react';
import { getCurrencyList, getRate } from './apis';

const CurrencyBox = ({from='USD', to='EUR'}) => {
    const [fromCurrency, setFromCurrency] = useState(from);
    const [toCurrency, setToCurrency] = useState(to);
    const [rate, setRate] = useState(1);
    const [list, setList] = useState([]);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        getCurrencyList()
        .then( list => setList(list) )
        
        getRate(fromCurrency, toCurrency)
        .then( rate => {
            setRate(rate)
        })
    }, [fromCurrency, toCurrency])

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

    const changeAmount =  ({ target : { value }}, whichCurrency ) => {
        switch(whichCurrency){
            case 'from':
                setAmount(value);
                break;
            case 'to':
                setAmount(value*(1/rate).toFixed(6));
                break;
            default:
                break;
        }
    }
  return (
    <div className="CurrencyBox-container">
        <OneBox from={fromCurrency} 
                to={toCurrency} 
                fromFullName={fromCurrency}
                rate={rate}
                list={list}
                amount={amount}
                changeCurrency={changeCurrency}
                changeAmount={changeAmount}/>
        <OneBox from={toCurrency} 
                to={fromCurrency} 
                fromFullName={toCurrency}
                rate={(1/rate).toFixed(6)}
                list={list}
                amount={amount*rate}
                changeCurrency={changeCurrency}
                changeAmount={changeAmount}/>
    </div>
  );
}

const OneBox = ({from, to, fromFullName, rate, list, amount, changeCurrency, changeAmount}) => 
<div className="CurrencyBox">
    <p className="CurrencyBox-label">1 {from} = {rate} {to}</p>
    <div className="CurrencyBox-input">
        <div className="CurrencyBox-input-dropdown-container">
            <select className="CurrencyBox-input-dropdown"
                    value={ fromFullName }
                    onChange={e =>changeCurrency( e, 'from')}>
                {list.map(each =>
                    <option key={each}>{each}</option>
                )}
            </select>
        </div>
        <input 
            className="CurrencyBox-input-text"
            type="text" 
            value={amount}>
        </input>
    </div>
</div>

export default CurrencyBox;
