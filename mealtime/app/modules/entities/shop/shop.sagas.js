import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ShopActions from './shop.reducer';

function* getShop(api, action) {
  const { shopId } = action;
  // make the call to the api
  const apiCall = call(api.getShop, shopId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ShopActions.shopSuccess(response.data));
  } else {
    yield put(ShopActions.shopFailure(response.data));
  }
}

function* getAllShops(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllShops, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ShopActions.shopAllSuccess(response.data, response.headers));
  } else {
    yield put(ShopActions.shopAllFailure(response.data));
  }
}

function* updateShop(api, action) {
  const { shop } = action;
  // make the call to the api
  const idIsNotNull = !(shop.id === null || shop.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateShop : api.createShop, shop);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ShopActions.shopUpdateSuccess(response.data));
  } else {
    yield put(ShopActions.shopUpdateFailure(response.data));
  }
}

function* deleteShop(api, action) {
  const { shopId } = action;
  // make the call to the api
  const apiCall = call(api.deleteShop, shopId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ShopActions.shopDeleteSuccess());
  } else {
    yield put(ShopActions.shopDeleteFailure(response.data));
  }
}

export default {
  getAllShops,
  getShop,
  deleteShop,
  updateShop,
};
