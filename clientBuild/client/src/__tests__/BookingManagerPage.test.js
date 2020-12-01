import { render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import BookingManagerPage from '../BookingManagerPage';
import React from 'react';
import API from '../API';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
    const tree = TestRenderer.create(<BookingManagerPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });