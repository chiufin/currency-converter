import React, { useState, useEffect } from "react";
import { getCurrencyList, getRate } from "./apis";
import convertIcon from "./images/convert_icon.png";

const CurrencyType = {
  FROM: "from",
  TO: "to"
};

const CurrencyBox = ({ from = "USD", to = "USD" }) => {
  const [fromCurrency, setFromCurrency] = useState(from);
  const [toCurrency, setToCurrency] = useState(to);
  const [rate, setRate] = useState(1);
  const [list, setList] = useState([]);
  const [amount, setAmount] = useState(1);
  const [reversedAmount, setReversedAmount] = useState(1);
  const [rateButtonPosition, setRateButtonPosition] = useState(true);

  useEffect(() => {
    getCurrencyList()
      .then(list => setList(list))
      .catch(err => {});
  }, []);

  useEffect(() => {
    getRate(fromCurrency, toCurrency)
      .then(rate => {
        setRate(rate);
      })
      .catch(err => {});
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (rateButtonPosition) {
      setReversedAmount(amount * rate);
    } else {
      setAmount(reversedAmount / rate);
    }
  }, [rate, rateButtonPosition, amount, reversedAmount]);

  const changeCurrency = ({ target: { value, name } }) => {
    if (name === CurrencyType.FROM) {
      setFromCurrency(value);
      setRateButtonPosition(true);
    }
    if (name === CurrencyType.TO) {
      setToCurrency(value);
      setRateButtonPosition(false);
    }
  };

  const changeAmount = ({ target: { value, name } }) => {
    if (!isNaN(Number(value))) {
      if (name === CurrencyType.FROM) {
        setAmount(value);
      }
      if (name === CurrencyType.TO) {
        setReversedAmount(value);
        setAmount(value / rate);
      }
    }
  };
  return (
    <div className="CurrencyBox-container">
      <OneBox
        type={CurrencyType.FROM}
        from={fromCurrency}
        to={toCurrency}
        fromFullName={fromCurrency}
        rate={rate}
        list={list}
        amount={amount}
        changeCurrency={changeCurrency}
        changeAmount={changeAmount}
      />
      <div className="CurrencyBox-convert-container">
        <img
          className="CurrencyBox-convert-icon"
          src={convertIcon}
          alt="covert icon"
        />
      </div>
      <OneBox
        type={CurrencyType.TO}
        from={toCurrency}
        to={fromCurrency}
        fromFullName={toCurrency}
        rate={1 / rate}
        list={list}
        amount={reversedAmount}
        changeCurrency={changeCurrency}
        changeAmount={changeAmount}
      />
    </div>
  );
};

export const OneBox = ({
  type,
  from,
  to,
  fromFullName,
  rate,
  list = [],
  amount,
  changeCurrency,
  changeAmount
}) => (
  <div className="CurrencyBox">
    <p className="CurrencyBox-label">
      1 {from} = {rate} {to}
    </p>
    <div className="CurrencyBox-input">
      <div className="CurrencyBox-input-dropdown-container">
        <select
          className="CurrencyBox-input-dropdown"
          value={fromFullName}
          name={type}
          onChange={changeCurrency}
        >
          {list.map(each => (
            <option key={each}>{each}</option>
          ))}
        </select>
      </div>
      <input
        className="CurrencyBox-input-text"
        type="text"
        name={type}
        value={amount}
        onChange={changeAmount}
      ></input>
    </div>
  </div>
);

export default CurrencyBox;
