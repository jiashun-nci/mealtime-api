import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import configureStore from './create-store';
import rootSaga from '../sagas';
import ReduxPersist from '../../config/redux-persist';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  products: require('../../modules/entities/product/product.reducer').reducer,
  productCategories: require('../../modules/entities/product-category/product-category.reducer').reducer,
  shops: require('../../modules/entities/shop/shop.reducer').reducer,
  customerDetails: require('../../modules/entities/customer-details/customer-details.reducer').reducer,
  shoppingCarts: require('../../modules/entities/shopping-cart/shopping-cart.reducer').reducer,
  productOrders: require('../../modules/entities/product-order/product-order.reducer').reducer,
  orderItems: require('../../modules/entities/order-item/order-item.reducer').reducer,
  riders: require('../../modules/entities/rider/rider.reducer').reducer,
  // jhipster-react-native-redux-store-import-needle
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  register: require('../../modules/account/register/register.reducer').reducer,
  changePassword: require('../../modules/account/password/change-password.reducer').reducer,
  forgotPassword: require('../../modules/account/password-reset/forgot-password.reducer').reducer,
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./index').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
