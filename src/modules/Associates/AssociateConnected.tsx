import * as React from "react";
import {Mutation, Query} from "react-apollo";
import {RouteComponentProps, withRouter} from "react-router";
import Spinner from "reactstrap/lib/Spinner";
import {AddAssociate, AddAssociateVariables} from "./apolloTypes/AddAssociate";
import {GetAssociate, GetAssociateVariables} from "./apolloTypes/GetAssociate";
import {AssociateForm} from "./AssociateForm";
import {ADD_ASSOCIATE, GET_ASSOCIATE} from "./gql";

export interface AssociateConnectedProps extends RouteComponentProps<{id?: string}> {}

const AssociateConnected: React.FunctionComponent<AssociateConnectedProps> = (props) => {
  const id = props.match.params.id ? Number(props.match.params.id) : void 0;
  return (
  <Mutation<AddAssociate, AddAssociateVariables> mutation={ADD_ASSOCIATE}>
    {(addAssociate) => (
      <Query<GetAssociate, GetAssociateVariables> query={GET_ASSOCIATE} variables={{ids: [id!]}} skip={!id}>
        {({ data, loading, error }) => (
          <div>
            {loading && <Spinner/>}
            {!loading && <AssociateForm/>}
            {
              console.log('id', id)
            }
            {
              console.log('loading', loading)
            }
            {
              console.log('data', data)
            }
            {
              console.log('error', error)
            }
            {
              console.log('addAssociate', addAssociate)
            }
          </div>
        )}
      </Query>
    )}
  </Mutation>
)};

const AssociateRouted = withRouter(AssociateConnected);

export {
  AssociateRouted as Associate,
  AssociateConnected,
};
