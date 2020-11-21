import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';

test('renders learn react link', () => {
  const testRender = render(<App/>);
  expect(testRender).not.toBe(null);
});