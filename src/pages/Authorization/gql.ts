import gql from "graphql-tag";


const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            id
            username
        }
    }
`;

const LOGIN = gql`
    mutation Login(
    $username: String!,
    $password: String!,
    ) {
        login (
            input: {
                username: $username,
                password: $password,
            }
        )
    }
`;

export {
    GET_CURRENT_USER,
    LOGIN,
};
