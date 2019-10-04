import React from 'react';
import { shallow, mount} from 'enzyme';
import CurrencyBox, { OneBox } from './CurrencyBox';

describe("Currency Box" , () => {
  const wrapper = shallow(<CurrencyBox />);
  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('CurrencyBox', () => {
  
    const wrapper = mount(<CurrencyBox/>);
    expect(wrapper).toBeDefined();
    wrapper.find('input[name="from"]').simulate('change', {
      target: {
        value: 100,
        name: "from"
      },
    });
    wrapper.find('input[name="to"]').simulate('change', {
      target: {
        value: 100,
        name: "to"
      },
    });
    wrapper.find('select[name="from"]').simulate('change', {
      target: {
        value: 'EUR',
        name: "from"
      },
    });
    wrapper.find('select[name="to"]').simulate('change', {
      target: {
        value: 'EUR',
        name: "to"
      },
    });
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