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

test("switch default case", async () => {
    const component = shallow(<SupportOfficerPage/>);
    const instance = component.instance();
    instance.setState({options:  [
      { id: 0, name: "Setup", path: "/setup" },
      { id: 1, name: "Update schedule of courses", path: "/updateSchedule" },
      { id: 2, name: "Update bookable lectures", path: "/updateBookable" },
      { id: 3, name: "Test", path: "/test" }
  ]});
    component.render();
    expect(instance.state.options[3].id).toBe(3);
});