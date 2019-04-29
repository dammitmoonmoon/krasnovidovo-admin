import * as React from "react";
import {Mutation} from "react-apollo";
import {RouteComponentProps, withRouter} from "react-router";
import {Button, Spinner} from "reactstrap";
import {ErrorReport} from "../ErrorReport/ErrorReport";
import {Paths} from "../Routing";
import {Logout} from "./apolloTypes/Logout";
import {LOGOUT} from "./gql";

class LogoutMutation extends Mutation<
  Logout
  > {}

interface Props extends RouteComponentProps {};

const LogoutButton = ({history}: Props) => (
  <LogoutMutation mutation={LOGOUT}>
    {(logout, logoutData) => {
      const logoutHandler = async (): Promise<JSX.Element|null> => {
        await logout();
        if (logoutData.loading) {
          return <Spinner />
        }
        if (logoutData.error ) {
          return <ErrorReport errorMessage="logout failure"/>
        }
        history.location.pathname === Paths.INITIAL ? location.reload() : history.push(Paths.INITIAL);
        return null;
      };
      return (
        <Button color="info" onClick={logoutHandler} id="logoutButton">Выйти</Button>
      );
    }
    }
  </LogoutMutation>
);

const LogoutButtonRouted = withRouter(LogoutButton);
export {LogoutButtonRouted as LogoutButton};
