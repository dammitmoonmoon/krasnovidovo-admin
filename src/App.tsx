import React, { Component } from 'react';
import {ApolloProvider} from "react-apollo";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import {apolloClient} from "./components/apolloClient";
import {Main} from "./components/Main";

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
