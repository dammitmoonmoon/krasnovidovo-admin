/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddAssociateInput } from "./../../../common/graphql/ApolloTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AddAssociate
// ====================================================

export interface AddAssociate_addAssociate {
  id: string;
  fullName: string;
  position: string;
  photo: string | null;
  email: string | null;
  link: string | null;
  personalPage: string | null;
}

export interface AddAssociate {
  addAssociate: AddAssociate_addAssociate;
}

export interface AddAssociateVariables {
  input: AddAssociateInput;
}
