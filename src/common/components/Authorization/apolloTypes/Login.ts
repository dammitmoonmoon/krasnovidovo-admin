/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Roles } from "./../../../graphql/ApolloTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  username: string;
  role: Roles;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  username: string;
  password: string;
}
