import {RouteComponentProps} from "react-router";
import {ADD_ASSOCIATE, GET_ASSOCIATE} from "./gql";

const testId = 1;

const testMutationVariables = {
  fullName: '',
  position: '',
  photo: '',
  email: '',
  link: '',
  personalPage: '',
};

const testQueryData = {
  ...testMutationVariables,
  id: testId,
};


const commonMocks = [
  {
    request: {
      query: GET_ASSOCIATE,
      variables: {
        id: [testId],
      },
    },
    result: {
      data: testQueryData
    },
  },
  {
    request: {
      query: ADD_ASSOCIATE,
      variables: {
        input: testMutationVariables,
      },
    },
    result: {
      data: testQueryData
    },
  },
];

const matchWithId = {
  isExact: true,
  params: { id: testId.toString() },
  path: "",
  url: ""
};

const match = {
  isExact: true,
  params: {},
  path: "",
  url: ""
};

const initialProps = {...({} as RouteComponentProps<{id?: string}>), match};
const initialPropsWithId = {...({} as RouteComponentProps<{id?: string}>), match: matchWithId};

export {
  initialProps,
  initialPropsWithId,
  commonMocks
};
