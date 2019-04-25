import * as React from "react";
import {Mutation, Query} from "react-apollo";
import {GetCurrentUser} from "./apolloTypes/GetCurrentUser";
import {Login, LoginVariables} from "./apolloTypes/Login";
import {Authorization} from "./Authorization";
import {GET_CURRENT_USER, LOGIN} from "./gql";

class GetCurrentUserQuery extends Query<
    GetCurrentUser
    > {}
class LoginMutation extends Mutation<
    Login,
    LoginVariables
    > {}

const AuthorizationConnected: React.FunctionComponent<{}> = () => (
    <GetCurrentUserQuery
        query={GET_CURRENT_USER}
    >
        {(currentUserData) => (
            <LoginMutation mutation={LOGIN}>
                {(login, loginData) => (
                    <Authorization
                        currentUserData = {currentUserData}
                        loginData = {loginData}
                        login = {login}
                    />
                )}
            </LoginMutation>
        )}
    </GetCurrentUserQuery>
)

export {
    AuthorizationConnected
};