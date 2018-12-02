import React from 'react';
import { render } from 'react-dom';
import { configure, history } from './store/configureStore';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'

const store = configure();

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