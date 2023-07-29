import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import OrderActions from './order.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getOrder(api, action) {
  const { orderId } = action;
  // make the call to the api
  const apiCall = call(api.getOrder, orderId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(OrderActions.orderSuccess(response.data));
  } else {
    yield put(OrderActions.orderFailure(response.data));
  }
}

function* getAllOrders(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllOrders, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(OrderActions.orderAllSuccess(response.data, response.headers));
  } else {
    yield put(OrderActions.orderAllFailure(response.data));
  }
}

function* updateOrder(api, action) {
  const { order } = action;
  // make the call to the api
  const idIsNotNull = !(order.id === null || order.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateOrder : api.createOrder, order);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(OrderActions.orderUpdateSuccess(response.data));
  } else {
    yield put(OrderActions.orderUpdateFailure(response.data));
  }
}

function* deleteOrder(api, action) {
  const { orderId } = action;
  // make the call to the api
  const apiCall = call(api.deleteOrder, orderId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(OrderActions.orderDeleteSuccess());
  } else {
    yield put(OrderActions.orderDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.placedDate = convertDateTimeFromServer(data.placedDate);
  return data;
}

export default {
  getAllOrders,
  getOrder,
  deleteOrder,
  updateOrder,
};
