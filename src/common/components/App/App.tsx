import React, { Component } from 'react';
import {ApolloProvider} from "react-apollo";
import {BrowserRouter} from "react-router-dom";
import {apolloClient} from "../../apollo/apolloClient";
import {Main} from "../Main";

class App extends Component {
  public render() {
    return (
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </ApolloProvider>
    );
  }
}

export default App;
