import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import * as serviceWorker from './serviceWorker';
import { ForwardDash } from './forward-dash'

const client = new ApolloClient({
  uri: 'https://forward-dash-graphql.herokuapp.com/graphql',
});

const Main = () => {
    return (
        <ApolloProvider client={client}>
            <ForwardDash />
        </ApolloProvider>
    )
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
