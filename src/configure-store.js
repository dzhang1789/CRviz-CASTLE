import { createStore, applyMiddleware, compose } from "redux";

import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './domain/root-reducer';
import rootEpic from './epics/root-epic';

// Replace redux compose with redux-devtools compose if it exists
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logMiddle = store => next => action => {
  console.log('Dispatch:', action.type);
  console.log('Previous state:', store.getState());
  const result = next(action);
  console.log('Next State:', store.getState());
  return result
}
const configureStore = (initialState = {}) => {
  const middleware = createEpicMiddleware()

  const store = createStore(rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(logMiddle, middleware)
    )
  );

  middleware.run(rootEpic);

  return store;
};

export default configureStore;
