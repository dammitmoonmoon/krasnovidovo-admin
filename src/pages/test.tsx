import React from "react";
import {Query} from "react-apollo";
import {GetCurrentUser} from "./Authorization/apolloTypes/GetCurrentUser";
import {GET_CURRENT_USER} from "./Authorization/gql";

class GetCurrentUserQuery extends Query<
  GetCurrentUser
  > {}

const Test: React.FC<{}> = () => (
  <GetCurrentUserQuery
    query={GET_CURRENT_USER}
  >
    { ({error}) =>
      <div>
        TEST PAGE
        {console.log('error:', error)}
      </div>
    }

  </GetCurrentUserQuery>
);

export {
  Test
};
