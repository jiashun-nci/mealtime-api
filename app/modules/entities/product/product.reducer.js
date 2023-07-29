import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productRequest: ['productId'],
  productAllRequest: ['options'],
  productUpdateRequest: ['product'],
  productDeleteRequest: ['productId'],

  productSuccess: ['product'],
  productAllSuccess: ['productList', 'headers'],
  productUpdateSuccess: ['product'],
  productDeleteSuccess: [],

  productFailure: ['error'],
  productAllFailure: ['error'],
  productUpdateFailure: ['error'],
  productDeleteFailure: ['error'],

  productReset: [],
});

export const ProductTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  product: { id: undefined },
  productList: [],
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
    product: INITIAL_STATE.product,
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
  const { product } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    product,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { productList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    productList: loadMoreDataWhenScrolled(state.productList, productList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { product } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    product,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    product: INITIAL_STATE.product,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    product: INITIAL_STATE.product,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    productList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    product: state.product,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    product: state.product,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_REQUEST]: request,
  [Types.PRODUCT_ALL_REQUEST]: allRequest,
  [Types.PRODUCT_UPDATE_REQUEST]: updateRequest,
  [Types.PRODUCT_DELETE_REQUEST]: deleteRequest,

  [Types.PRODUCT_SUCCESS]: success,
  [Types.PRODUCT_ALL_SUCCESS]: allSuccess,
  [Types.PRODUCT_UPDATE_SUCCESS]: updateSuccess,
  [Types.PRODUCT_DELETE_SUCCESS]: deleteSuccess,

  [Types.PRODUCT_FAILURE]: failure,
  [Types.PRODUCT_ALL_FAILURE]: allFailure,
  [Types.PRODUCT_UPDATE_FAILURE]: updateFailure,
  [Types.PRODUCT_DELETE_FAILURE]: deleteFailure,
  [Types.PRODUCT_RESET]: reset,
});
