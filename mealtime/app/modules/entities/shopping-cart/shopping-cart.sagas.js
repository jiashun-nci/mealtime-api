import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ShoppingCartActions from './shopping-cart.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getShoppingCart(api, action) {
  const { shoppingCartId } = action;
  // make the call to the api
  const apiCall = call(api.getShoppingCart, shoppingCartId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(ShoppingCartActions.shoppingCartSuccess(response.data));
  } else {
    yield put(ShoppingCartActions.shoppingCartFailure(response.data));
  }
}

function* getAllShoppingCarts(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllShoppingCarts, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ShoppingCartActions.shoppingCartAllSuccess(response.data, response.headers));
  } else {
    yield put(ShoppingCartActions.shoppingCartAllFailure(response.data));
  }
}

function* updateShoppingCart(api, action) {
  const { shoppingCart } = action;
  // make the call to the api
  const idIsNotNull = !(shoppingCart.id === null || shoppingCart.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateShoppingCart : api.createShoppingCart, shoppingCart);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(ShoppingCartActions.shoppingCartUpdateSuccess(response.data));
  } else {
    yield put(ShoppingCartActions.shoppingCartUpdateFailure(response.data));
  }
}

function* deleteShoppingCart(api, action) {
  const { shoppingCartId } = action;
  // make the call to the api
  const apiCall = call(api.deleteShoppingCart, shoppingCartId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ShoppingCartActions.shoppingCartDeleteSuccess());
  } else {
    yield put(ShoppingCartActions.shoppingCartDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.placedDate = convertDateTimeFromServer(data.placedDate);
  return data;
}

export default {
  getAllShoppingCarts,
  getShoppingCart,
  deleteShoppingCart,
  updateShoppingCart,
};
