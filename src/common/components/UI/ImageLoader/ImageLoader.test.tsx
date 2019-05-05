import {configure, mount, ReactWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {MockedProvider} from 'react-apollo/test-utils';
import {Button, Input, Spinner} from 'reactstrap';
import waitForExpect from 'wait-for-expect';
import {ErrorCodes, ErrorMessages, NETWORK_ERROR} from "../../../apollo/errors";
import {Hint} from "../misc";
import {UPLOAD_IMAGE} from './gql';
import {ImageLoader} from './ImageLoader';
import {Image} from './styles';

configure({ adapter: new Adapter() });

const file = new File(['dummy data'], 'dummy.png', {
  type: 'image/png',
});

const fileList = {
  0: file,
  length: 1,
  item: () => file
};

const imageUrl = 'http://localhost:4000/1556990861782.jpeg';

const commonMocks = [
  {
    request: {
      query: UPLOAD_IMAGE,
      variables: {
        file,
      },
    },
    result: {
      data: {
        uploadImage: {
          imageUrl,
          filename: '1556990861782.jpeg',
          __typename: 'ImageFile',
        }
      }
    },
  },
];

describe('ImageLoader', () => {
  it('renders without error', () => {
    mount(
      <MockedProvider mocks={commonMocks}>
        <ImageLoader />
      </MockedProvider>,
    );
  });


  it('Only renders the submit button when a file is provided', async () => {
    const wrapper = await getWrapperBeforeMutation();
    expect(wrapper.find(Button)).toHaveLength(0);
    const input = wrapper.find(Input);

    input.simulate('change', {
      target: {
        files: fileList
      }});
    expect(wrapper.find(Button)).toHaveLength(1);
  });


  it('Does not render an Image component unless a request has been sent to the server', async () => {
    const wrapper = await getWrapperBeforeMutation();
    expect(wrapper.find(Image)).toHaveLength(0);
  });


  it('Sends a request to backend and renders a spinner while waiting for the data', async () => {
    const wrapper = await getWrapperWhileLoading();
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });


  it('Renders an image upon a successful request', async () => {
    const wrapper = await getWrapperAfterLoading();
    const image = wrapper.find(Image);
    expect(image.prop("imageUrl")).toEqual(imageUrl);
  });

  it('Renders a network error message upon a non-graphql error', async () => {
    const genericError = new Error("random error");
    const erroneousMocks = [{
      ...commonMocks[0],
      error: genericError,
    }];
    const tempWrapper = await getWrapperAfterLoading(erroneousMocks);
    expect(tempWrapper.find(Hint).text()).toEqual(NETWORK_ERROR);
  });

  it('Renders a specific error message upon a graphql error', async () => {
    const erroneousMocks = [{
      ...commonMocks[0],
      result: {
        data: {
          uploadImage: {
            imageUrl,
            filename: '1556990861782.jpeg',
            __typename: 'ImageFile',
          }
        },
        errors: [{ extensions: { code: ErrorCodes.image_saving_failed} }],
      },
    }];
    const tempWrapper = await getWrapperAfterLoading(erroneousMocks);
    expect(tempWrapper.find(Hint).text()).toEqual(ErrorMessages[ErrorCodes.image_saving_failed]);
  });
});


async function getWrapperBeforeMutation(mocks: any = commonMocks): Promise<ReactWrapper> {
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <ImageLoader/>
    </MockedProvider>,
  );
  return wrapper;
}

async function getWrapperWhileLoading(mocks: any = commonMocks): Promise<ReactWrapper> {
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <ImageLoader/>
    </MockedProvider>,
  );
  const input = wrapper.find(Input);
  input.simulate('change', {
    target: {
      files: fileList
    }
  });
  const button = wrapper.find(Button);
  button.simulate('click');
  return wrapper;
}

async function getWrapperAfterLoading(mocks: any = commonMocks): Promise<ReactWrapper> {
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <ImageLoader/>
    </MockedProvider>,
  );
  const input = wrapper.find(Input);
  input.simulate('change', {
    target: {
      files: fileList
    }
  });
  const button = wrapper.find(Button);
  button.simulate('click');
  await waitForExpect(() => {
    wrapper.update();
    expect(wrapper.find(Spinner)).toHaveLength(0);
  });
  return wrapper;
}
