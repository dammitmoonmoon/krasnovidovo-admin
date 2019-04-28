import React, { Component } from 'react';
import {ApolloProvider} from "react-apollo";
import {BrowserRouter} from "react-router-dom";
import {apolloClient} from "../../apollo/apolloClient";
import {RouteSwitcher} from "../Routing";

class App extends Component {
  public render() {
    return (
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
                <RouteSwitcher/>
            </BrowserRouter>
        </ApolloProvider>
    );
  }
}

export default App;
