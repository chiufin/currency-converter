import React, { useState, useEffect } from 'react';
import { getCurrencyList } from './apis';

function CurrencyBox() {
    const [list, setList] = useState([]);

    useEffect(() => {
        getCurrencyList().then(data => setList(data))
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
