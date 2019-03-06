import { createStore,applyMiddleware } from "redux";
import rootReducer from "./reducers";
import logger from 'redux-logger'
import rootSaga from "./middleware";
import createSagaMiddleware from "redux-saga";


const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware,logger)

const store = createStore(rootReducer,middleware);

sagaMiddleware.run(rootSaga)

export default store;