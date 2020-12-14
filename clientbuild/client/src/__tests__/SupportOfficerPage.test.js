import TestRenderer from 'react-test-renderer';
import React from 'react';
import SupportOfficerPage from '../SupportOfficer/SupportOfficerPage';
import API from '../API';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders SupportOfficerPage page', () => {
    const tree = TestRenderer.create(<SupportOfficerPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });