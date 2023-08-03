import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productOrderRequest: ['productOrderId'],
  productOrderAllRequest: ['options'],
  productOrderUpdateRequest: ['productOrder'],
  productOrderDeleteRequest: ['productOrderId'],

  productOrderSuccess: ['productOrder'],
  productOrderAllSuccess: ['productOrderList', 'headers'],
  productOrderUpdateSuccess: ['productOrder'],
  productOrderDeleteSuccess: [],

  productOrderFailure: ['error'],
  productOrderAllFailure: ['error'],
  productOrderUpdateFailure: ['error'],
  productOrderDeleteFailure: ['error'],

  productOrderReset: [],
});

export const ProductOrderTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  productOrder: { id: undefined },
  productOrderList: [],
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
    productOrder: INITIAL_STATE.productOrder,
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
  const { productOrder } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    productOrder,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { productOrderList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    productOrderList: loadMoreDataWhenScrolled(state.productOrderList, productOrderList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { productOrder } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    productOrder,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    productOrder: INITIAL_STATE.productOrder,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    productOrder: INITIAL_STATE.productOrder,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    productOrderList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    productOrder: state.productOrder,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    productOrder: state.productOrder,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_ORDER_REQUEST]: request,
  [Types.PRODUCT_ORDER_ALL_REQUEST]: allRequest,
  [Types.PRODUCT_ORDER_UPDATE_REQUEST]: updateRequest,
  [Types.PRODUCT_ORDER_DELETE_REQUEST]: deleteRequest,

  [Types.PRODUCT_ORDER_SUCCESS]: success,
  [Types.PRODUCT_ORDER_ALL_SUCCESS]: allSuccess,
  [Types.PRODUCT_ORDER_UPDATE_SUCCESS]: updateSuccess,
  [Types.PRODUCT_ORDER_DELETE_SUCCESS]: deleteSuccess,

  [Types.PRODUCT_ORDER_FAILURE]: failure,
  [Types.PRODUCT_ORDER_ALL_FAILURE]: allFailure,
  [Types.PRODUCT_ORDER_UPDATE_FAILURE]: updateFailure,
  [Types.PRODUCT_ORDER_DELETE_FAILURE]: deleteFailure,
  [Types.PRODUCT_ORDER_RESET]: reset,
});
