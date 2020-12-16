import TestRenderer from 'react-test-renderer';
import React from 'react';
import Dropzone from '../SupportOfficer/Dropzone';
import API from '../API';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders Dropzone page', () => {
    const tree = TestRenderer.create(<Dropzone disabled={false}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test("render Dropzone with file", async () => {
    const tree = TestRenderer.create(<Dropzone disabled={false} onFileAdded={jest.fn()} file={{name: "test.csv", type: "text/csv", name: "test"}}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

const onFileAddedMock = jest.fn();
test("onDrop", async () => {
    const component = await shallow(<Dropzone disabled={false} onFileAdded={jest.fn()}/>);
    const instance = await component.instance();
    await instance.onDrop({dataTransfer: {files: [{name: "test.csv", type: "text/csv"}, {type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.props.onFileAdded).toHaveBeenCalledTimes(1);
    expect(instance.state.highlight).toBe(false);
    await instance.onDrop({dataTransfer: {files: [{name: "test.json", type: "text/JSON"}]}, preventDefault: jest.fn()});
    expect(instance.props.onFileAdded).toHaveBeenCalledTimes(1);
    expect(instance.state.highlight).toBe(false);
    await instance.onDrop({dataTransfer: {files: []}, preventDefault: jest.fn()});
    expect(instance.props.onFileAdded).toHaveBeenCalledTimes(1);
    expect(instance.state.highlight).toBe(false);
});

test("onDrop with undefined onFileAdded", async () => {
    const component = await shallow(<Dropzone disabled={false} onFileAdded={undefined}/>);
    const instance = await component.instance();
    await instance.onDrop({dataTransfer: {files: [{name: "test.csv", type: "text/csv"}, {type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.props.onFileAdded).toBe(undefined);
    expect(instance.state.highlight).toBe(false);
});

test("onDrop with disabled true", async () => {
    const component = await shallow(<Dropzone disabled={true} onFileAdded={undefined}/>);
    const instance = await component.instance();
    await instance.onDrop({dataTransfer: {files: [{name: "test.csv", type: "text/csv"}, {type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.props.onFileAdded).toBe(undefined);
    expect(instance.state.highlight).toBe(false);
});

test("onDragLeave", async () => {
    const component = await shallow(<Dropzone disabled={false} onFileAdded={onFileAddedMock}/>);
    const instance = await component.instance();
    await instance.onDragLeave({dataTransfer: {files: [{name: "test.csv", type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.state.highlight).toBe(false);
});

test("onDragOver", async () => {
    const component = await shallow(<Dropzone disabled={false} onFileAdded={onFileAddedMock}/>);
    const instance = await component.instance();
    expect(instance.state.highlight).toBe(false);
    await instance.onDragOver({target: {files: [{name: "test.csv", type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.state.highlight).toBe(true);
});

test("onDragOver disabled true", async () => {
    const component = await shallow(<Dropzone disabled={true} onFileAdded={onFileAddedMock}/>);
    const instance = await component.instance();
    expect(instance.state.highlight).toBe(false);
    await instance.onDragOver({target: {files: [{name: "test.csv", type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.state.highlight).toBe(false);
});

test("onFileAdded", async () => {
    const component = await shallow(<Dropzone disabled={false} onFileAdded={jest.fn()}/>);
    const instance = await component.instance();
    expect(instance.state.highlight).toBe(false);
    await instance.onFileAdded({target: {files: [{name: "test.csv", type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.props.onFileAdded).toHaveBeenCalledTimes(1);
    await instance.onFileAdded({target: {files: []}, preventDefault: jest.fn()});
    expect(instance.props.onFileAdded).toHaveBeenCalledTimes(1);
});

test("onFileAdded undefined onFileAdded", async () => {
    const component = await shallow(<Dropzone disabled={false} onFileAdded={undefined}/>);
    const instance = await component.instance();
    expect(instance.state.highlight).toBe(false);
    await instance.onFileAdded({target: {files: [{name: "test.csv", type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.props.onFileAdded).toBe(undefined);
});

test("onFileAdded disabled", async () => {
    const component = await shallow(<Dropzone disabled={true} onFileAdded={jest.fn()}/>);
    const instance = await component.instance();
    expect(instance.state.highlight).toBe(false);
    await instance.onFileAdded({target: {files: [{name: "test.csv", type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.props.onFileAdded).toHaveBeenCalledTimes(0);
});

test("openFileDialog", async () => {
    const component = await shallow(<Dropzone disabled={false} onFileAdded={true}/>);
    const instance = await component.instance();
    instance.fileInputRef = {current: {click: jest.fn()}};
    await instance.openFileDialog({target: {files: [{name: "test.csv", type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.fileInputRef.current.click).toHaveBeenCalledTimes(1);
});

test("openFileDialog disabled true", async () => {
    const component = await shallow(<Dropzone disabled={true} onFileAdded={true}/>);
    const instance = await component.instance();
    instance.fileInputRef = {current: {click: jest.fn()}};
    await instance.openFileDialog({target: {files: [{name: "test.csv", type: "text/csv"}]}, preventDefault: jest.fn()});
    expect(instance.fileInputRef.current.click).toHaveBeenCalledTimes(0);
});