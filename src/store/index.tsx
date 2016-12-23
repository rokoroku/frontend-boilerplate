import { createStore, applyMiddleware } from 'redux';
import { logger } from '../middleware';
import rootReducer from '../reducers';

export default function configureStore(initialState?: any) {
  const create = (window as any).devToolsExtension
    ? (window as any).devToolsExtension()(createStore)
    : createStore;

  const createStoreWithMiddleware = applyMiddleware(logger)(create);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    });
  }

  return store;
}
