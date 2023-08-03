import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderItemRequest: ['orderItemId'],
  orderItemAllRequest: ['options'],
  orderItemUpdateRequest: ['orderItem'],
  orderItemDeleteRequest: ['orderItemId'],

  orderItemSuccess: ['orderItem'],
  orderItemAllSuccess: ['orderItemList', 'headers'],
  orderItemUpdateSuccess: ['orderItem'],
  orderItemDeleteSuccess: [],

  orderItemFailure: ['error'],
  orderItemAllFailure: ['error'],
  orderItemUpdateFailure: ['error'],
  orderItemDeleteFailure: ['error'],

  orderItemReset: [],
});

export const OrderItemTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  orderItem: { id: undefined },
  orderItemList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    orderItem: INITIAL_STATE.orderItem,
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
  const { orderItem } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    orderItem,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { orderItemList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    orderItemList: loadMoreDataWhenScrolled(state.orderItemList, orderItemList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { orderItem } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    orderItem,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    orderItem: INITIAL_STATE.orderItem,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    orderItem: INITIAL_STATE.orderItem,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    orderItemList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    orderItem: state.orderItem,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    orderItem: state.orderItem,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_ITEM_REQUEST]: request,
  [Types.ORDER_ITEM_ALL_REQUEST]: allRequest,
  [Types.ORDER_ITEM_UPDATE_REQUEST]: updateRequest,
  [Types.ORDER_ITEM_DELETE_REQUEST]: deleteRequest,

  [Types.ORDER_ITEM_SUCCESS]: success,
  [Types.ORDER_ITEM_ALL_SUCCESS]: allSuccess,
  [Types.ORDER_ITEM_UPDATE_SUCCESS]: updateSuccess,
  [Types.ORDER_ITEM_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORDER_ITEM_FAILURE]: failure,
  [Types.ORDER_ITEM_ALL_FAILURE]: allFailure,
  [Types.ORDER_ITEM_UPDATE_FAILURE]: updateFailure,
  [Types.ORDER_ITEM_DELETE_FAILURE]: deleteFailure,
  [Types.ORDER_ITEM_RESET]: reset,
});
