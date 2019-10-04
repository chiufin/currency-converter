import React from 'react';
import { shallow } from 'enzyme';
import CurrencyBox, { OneBox } from './CurrencyBox';

describe("Currency Box" , () => {
  it('CurrencyBox', () => {
  
    const wrapper = shallow(<CurrencyBox/>);
    expect(wrapper).toBeDefined();
  
  });
  it('OneBox: renders from currency, to currency', () => {
    const props = {
      from: 'USD',
      to: 'EUR',
      list: ['USD', 'EUR']
    }
    const wrapper = shallow(<OneBox {...props}/>);
    expect(wrapper.find(props.from)).toBeDefined();
    expect(wrapper.find(props.to)).toBeDefined();
  
  });
})