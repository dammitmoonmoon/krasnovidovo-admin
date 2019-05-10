import * as React from "react";
import {Mutation} from "react-apollo";
import {Login, LoginVariables} from "./apolloTypes/Login";
import {Authorization} from "./Authorization";
import {LOGIN} from "./gql";

const AuthorizationConnected: React.FunctionComponent<{}> = () => (
  <Mutation<Login, LoginVariables> mutation={LOGIN}>
    {(login, loginData) => (
      <Authorization
        loginData={loginData}
        login={login}
      />
    )}
  </Mutation>
);

export {
  AuthorizationConnected
};
