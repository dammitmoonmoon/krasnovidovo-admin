import gql from "graphql-tag";

const LOGOUT = gql`
  mutation Logout {
    logout {
      username
    }
  }
`;

export {
  LOGOUT
};
