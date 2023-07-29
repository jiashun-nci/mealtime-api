import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderRequest: ['orderId'],
  orderAllRequest: ['options'],
  orderUpdateRequest: ['order'],
  orderDeleteRequest: ['orderId'],

  orderSuccess: ['order'],
  orderAllSuccess: ['orderList', 'headers'],
  orderUpdateSuccess: ['order'],
  orderDeleteSuccess: [],

  orderFailure: ['error'],
  orderAllFailure: ['error'],
  orderUpdateFailure: ['error'],
  orderDeleteFailure: ['error'],

  orderReset: [],
});

export const OrderTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  order: { id: undefined },
  orderList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    order: INITIAL_STATE.order,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { order } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    order,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { orderList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    orderList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { order } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    order,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    order: INITIAL_STATE.order,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    order: INITIAL_STATE.order,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    orderList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    order: state.order,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    order: state.order,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_REQUEST]: request,
  [Types.ORDER_ALL_REQUEST]: allRequest,
  [Types.ORDER_UPDATE_REQUEST]: updateRequest,
  [Types.ORDER_DELETE_REQUEST]: deleteRequest,

  [Types.ORDER_SUCCESS]: success,
  [Types.ORDER_ALL_SUCCESS]: allSuccess,
  [Types.ORDER_UPDATE_SUCCESS]: updateSuccess,
  [Types.ORDER_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORDER_FAILURE]: failure,
  [Types.ORDER_ALL_FAILURE]: allFailure,
  [Types.ORDER_UPDATE_FAILURE]: updateFailure,
  [Types.ORDER_DELETE_FAILURE]: deleteFailure,
  [Types.ORDER_RESET]: reset,
});
