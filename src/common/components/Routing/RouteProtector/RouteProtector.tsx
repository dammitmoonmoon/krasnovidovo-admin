import gql from "graphql-tag";
import {FunctionComponent} from "react";
import * as React from "react";
import {Query} from "react-apollo";
import {RouteComponentProps, withRouter} from "react-router";
import {Spinner} from "reactstrap";
import {Authorization} from "../../Authorization";
import {GetCurrentUser} from "./apolloTypes/GetCurrentUser";

class GetCurrentUserQuery extends Query<
  GetCurrentUser
  > {}


const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      username
    }
  }
`;

interface Props extends RouteComponentProps {
  children: FunctionComponent;
}

const RouteProtector = (props: Props): JSX.Element => (
  <GetCurrentUserQuery
    query={GET_CURRENT_USER}
  >
    {
      ({data, loading, error}) => (
        <React.Fragment>
          {error && <Authorization/>}
          {loading && <Spinner/>}
          {
            !error && !loading && data &&
            props.children({})
          }
        </React.Fragment>
      )
    }
  </GetCurrentUserQuery>
);

const RouteProtectorRouted = withRouter(RouteProtector);
export { RouteProtectorRouted as RouteProtector };

