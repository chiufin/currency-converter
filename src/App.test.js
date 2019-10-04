import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('First React component test with Enzyme', () => {
   const wrapper = shallow(<App />);
   it('should match the snapshot', () => {
     expect(wrapper.html()).toMatchSnapshot();
   });
   it('renders without crashing', () => {
      shallow(<App />);
    });
});