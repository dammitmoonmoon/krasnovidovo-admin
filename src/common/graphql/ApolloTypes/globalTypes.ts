/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Only superuser can create other users
 */
export enum ErrorCodes {
  image_saving_failed = "image_saving_failed",
  logout_failed = "logout_failed",
  password_invalid = "password_invalid",
  session_not_found = "session_not_found",
  user_exists = "user_exists",
  user_not_found = "user_not_found",
  wrong_image_format = "wrong_image_format",
}

/**
 * Only superuser can create other users
 */
export enum Roles {
  SUPERUSER = "SUPERUSER",
  USER = "USER",
}

/**
 * New associate data
 */
export interface AddAssociateInput {
  id: number;
  fullName: string;
  position: string;
  photo?: string | null;
  email?: string | null;
  link?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
