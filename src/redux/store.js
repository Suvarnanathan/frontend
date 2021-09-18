import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/index';
import { createLogger } from 'redux-logger';

const initialState = {}
const loggerMiddleware = createLogger();
const middleware = []

const store = createStore(
    rootReducer, initialState,
    applyMiddleware(...middleware)
);

export default store;
