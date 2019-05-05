import { ApolloError } from 'apollo-client';
import { GraphQLError } from 'graphql';
import {ErrorCodes, ErrorMessages, getGQLErrorMessages, NETWORK_ERROR, UNKNOWN_ERROR} from './errors';

const graphQLError = {} as GraphQLError;

const error = new ApolloError({
  graphQLErrors: [
    {
      ...graphQLError,
      extensions: {
        code: ErrorCodes.image_saving_failed,
      },
    },
    {
      ...graphQLError,
      extensions: {
        code: ErrorCodes.logout_failed,
      },
    },
    {
      ...graphQLError,
      extensions: {
        code: 'random error',
      },
    },
    {
      ...graphQLError,
      extensions: {
        code: 'one more random error',
      },
    },
  ],
});

const emptyError = new ApolloError({});

test('getGQLErrorMessages correctly reflect Apollo Errors', () => {
  expect(getGQLErrorMessages(error)).toBe(
    `${ErrorMessages.image_saving_failed}\n${ErrorMessages.logout_failed}\n${UNKNOWN_ERROR}`,
  );
  expect(getGQLErrorMessages(emptyError)).toBe(NETWORK_ERROR);
  expect(getGQLErrorMessages(void 0)).toBe(null);
});
