import {ApolloError} from "apollo-client";
import gql from "graphql-tag";
import {EnumedDict} from "../../helpers/typescript-helpers";
import {ErrorCodes} from "../graphql/ApolloTypes/globalTypes";

export const GET_ERROR_CODES = gql`
  query GetErrorCodes {
    getErrorCodes {
      errorCode
    }
  }
`;

const UNKNOWN_ERROR = 'Неизвестная ошибка';
const NETWORK_ERROR = 'Ошибка сети';

const ErrorMessages: EnumedDict<ErrorCodes, string> = {
  [ErrorCodes.user_not_found]: "Пользователь не найден",
  [ErrorCodes.password_invalid]: "Неверный пароль",
  [ErrorCodes.user_exists]: "Пользователь уже существует",
  [ErrorCodes.logout_failed]: "Не удалось выйти из системы",
  [ErrorCodes.wrong_image_format]: "Неверный формат файла",
  [ErrorCodes.image_saving_failed]: "Ошибка при загрузке изображения",
  [ErrorCodes.session_not_found]: UNKNOWN_ERROR,
}

function getGQLErrorMessages(error?: ApolloError): string|null {
  if (!error) {
    return null;
  }
  const gqlErrors = error.graphQLErrors;
  if (!gqlErrors.length) {
    return NETWORK_ERROR
  }
  const errorCodes: ErrorCodes[] = gqlErrors.map(error => error.extensions && error.extensions.code);
  const errorMessages = errorCodes.map(error => ErrorMessages[error] || UNKNOWN_ERROR);
  const uniqueErrorMessages = [ ...new Set(errorMessages)];
  return uniqueErrorMessages.join('\n');
}

export {
  getGQLErrorMessages,
  ErrorMessages,
  ErrorCodes,
  UNKNOWN_ERROR,
  NETWORK_ERROR
};

