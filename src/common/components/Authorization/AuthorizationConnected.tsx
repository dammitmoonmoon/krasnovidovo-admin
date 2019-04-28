import * as React from "react";
import {Mutation} from "react-apollo";
import {Login, LoginVariables} from "./apolloTypes/Login";
import {Authorization} from "./Authorization";
import {LOGIN} from "./gql";

class LoginMutation extends Mutation<
    Login,
    LoginVariables
    > {}


const AuthorizationConnected: React.FunctionComponent<{}> = () => (
  <LoginMutation mutation={LOGIN}>
      {(login, loginData) => (
        <Authorization
          loginData={loginData}
          login={login}
        />
      )}
  </LoginMutation>
);

export {
    AuthorizationConnected
};
