import gql from 'graphql-tag';

const GET_ASSOCIATE = gql`
    query GetAssociate($ids: [Int!]!) {
    getAssociate(associateIds: $ids) {
        id
        fullName
        position
        photo
        email
        link
        personalPage
        }
    }
`;

const ADD_ASSOCIATE = gql`
  mutation AddAssociate($input: AddAssociateInput!) {
    addAssociate(input: $input) {
      id
      fullName
      position
      photo
      email
      link
      personalPage
    }
  }
`;

export { GET_ASSOCIATE, ADD_ASSOCIATE };
