import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import OrderItemActions from './order-item.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getOrderItem(api, action) {
  const { orderItemId } = action;
  // make the call to the api
  const apiCall = call(api.getOrderItem, orderItemId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(OrderItemActions.orderItemSuccess(response.data));
  } else {
    yield put(OrderItemActions.orderItemFailure(response.data));
  }
}

function* getAllOrderItems(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllOrderItems, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(OrderItemActions.orderItemAllSuccess(response.data, response.headers));
  } else {
    yield put(OrderItemActions.orderItemAllFailure(response.data));
  }
}

function* updateOrderItem(api, action) {
  const { orderItem } = action;
  // make the call to the api
  const idIsNotNull = !(orderItem.id === null || orderItem.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateOrderItem : api.createOrderItem, orderItem);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(OrderItemActions.orderItemUpdateSuccess(response.data));
  } else {
    yield put(OrderItemActions.orderItemUpdateFailure(response.data));
  }
}

function* deleteOrderItem(api, action) {
  const { orderItemId } = action;
  // make the call to the api
  const apiCall = call(api.deleteOrderItem, orderItemId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(OrderItemActions.orderItemDeleteSuccess());
  } else {
    yield put(OrderItemActions.orderItemDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.placedDate = convertDateTimeFromServer(data.placedDate);
  return data;
}

export default {
  getAllOrderItems,
  getOrderItem,
  deleteOrderItem,
  updateOrderItem,
};
