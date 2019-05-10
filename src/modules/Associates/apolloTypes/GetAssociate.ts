/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAssociate
// ====================================================

export interface GetAssociate_getAssociate {
  id: string;
  fullName: string;
  position: string;
  photo: string | null;
  email: string | null;
  link: string | null;
  personalPage: string | null;
}

export interface GetAssociate {
  getAssociate: GetAssociate_getAssociate[] | null;
}

export interface GetAssociateVariables {
  ids: number[];
}
