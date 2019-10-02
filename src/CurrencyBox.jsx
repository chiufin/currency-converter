import React, { useState, useEffect } from 'react';
import { getCurrencyList, getRate } from './apis';

function CurrencyBox({from='USD', to='EUR'}) {
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
  return (
    <>
        <div>
            <p>1  = {rate} </p>
            <select>
                {list.map(each =>
                    <option key={each} 
                            selected={ each === from }>{each}
                    </option>
                )}
            </select>
        </div>
        <div>
            <p>1  = {reversedRate} </p>
            <select>
                    {list.map(each =>
                        <option key={each} 
                                selected={ each === to }>{each}
                        </option>
                    )}
            </select>
        </div>
    </>
  );
}

export default CurrencyBox;
