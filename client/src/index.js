import React from 'react';
import { render } from 'react-dom';
import configureStore, { history } from './configureStore'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';

import registerServiceWorker from './registerServiceWorker';

import ReduxToastr from 'react-redux-toastr'
import App from './App';

import './index.css';
import '../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css'

const store = configureStore();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App />
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-left"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                    closeOnToastrClick />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();