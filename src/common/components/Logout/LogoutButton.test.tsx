import {configure, render, shallow} from 'enzyme';
import React from 'react';
import {Spinner} from "reactstrap";
// import wait from 'waait';
import {LOGOUT} from "./gql";
import {LogoutButton} from "./LogoutButton";

import Adapter from 'enzyme-adapter-react-16';
import {MockedProvider} from 'react-apollo/test-utils';

configure({ adapter: new Adapter() });

describe('LogoutButton', () => {
  it('should render correctly', () => {
    const component = shallow(<LogoutButton/>);

    expect(component).toMatchSnapshot();
  });

  const logoutData = {
    username: "admin"
  };
  const mocks = [
    {
      request: {
        query: LOGOUT,
        variables: { name: 'Buck' },
      },
      result: { data: { logoutData } },
    },
  ];

  it('should play well with apollo: render Spinner while loading', async () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LogoutButton/>
      </MockedProvider>);
    expect(component.find('#logoutButton')).toHaveLength(1);
    // button.simulate('click');
    // expect(component.find(<Spinner />)).toHaveLength(1);
  });
});
