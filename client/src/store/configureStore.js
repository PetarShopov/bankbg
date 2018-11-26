import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export const history = createHistory()

const middleware = [
	thunk,
	routerMiddleware(history),
]

const createStoreWithMiddleware = compose(
	applyMiddleware(...middleware)(createStore)
);

export function configure(initialState) {
	// Create the redux store and add middleware to it
	var configStore = createStoreWithMiddleware(
		rootReducer,
		initialState,
	)
	// Snippet to allow hot reload to work with reducers
	if (module.hot) {
		module.hot.accept(function _() {
			configStore.replaceReducer(rootReducer);
		});
	}
	return configStore;
};