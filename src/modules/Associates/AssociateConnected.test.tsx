import {configure, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {Query} from "react-apollo";
import {MockedProvider} from "react-apollo/test-utils";
import {AssociateConnected} from "./AssociateConnected";
import {AssociateForm} from "./AssociateForm";
import {commonMocks, initialProps, initialPropsWithId} from "./testData";

configure({ adapter: new Adapter() });

describe('AssociateConnected', () => {
  it('renders without error', () => {
    mount(
      <MockedProvider mocks={commonMocks}>
        <AssociateConnected {...initialProps}/>
      </MockedProvider>,
    );
  });
  it('makes no query if there is no id in the address', () => {
    const wrapper = mount(
      <MockedProvider mocks={commonMocks}>
        <AssociateConnected {...initialProps}/>
      </MockedProvider>,
    );
    const isQuerySkipped = (wrapper.find(Query).props().skip);
    expect(isQuerySkipped).toBe(true);
  });
  it('makes a query if there is an id in the address', () => {
    const wrapper = mount(
      <MockedProvider mocks={commonMocks}>
        <AssociateConnected {...initialPropsWithId}/>
      </MockedProvider>,
    );
    const isQuerySkipped = (wrapper.find(Query).props().skip);
    expect(isQuerySkipped).toBe(false);
  });
  it('renders an AssociateForm component immediately if there is no id in the address', () => {
    const wrapper = mount(
      <MockedProvider mocks={commonMocks}>
        <AssociateConnected {...initialProps}/>
      </MockedProvider>,
    );
    const form = wrapper.find(AssociateForm);
    expect(form).toHaveLength(1);
  });
  it('does not render an AssociateForm component immediately if there is an id in the address', () => {
    const wrapper = mount(
      <MockedProvider mocks={commonMocks}>
        <AssociateConnected {...initialPropsWithId}/>
      </MockedProvider>,
    );
    const form = wrapper.find(AssociateForm);
    expect(form).toHaveLength(0);
  });
});
