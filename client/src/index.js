import React from 'react';
import { render } from 'react-dom';
import { configure, history } from './store/configureStore';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import initialState from './reducers/initialState'

const store = configure(initialState);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();