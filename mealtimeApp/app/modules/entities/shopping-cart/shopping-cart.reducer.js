import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  shoppingCartRequest: ['shoppingCartId'],
  shoppingCartAllRequest: ['options'],
  shoppingCartUpdateRequest: ['shoppingCart'],
  shoppingCartDeleteRequest: ['shoppingCartId'],

  shoppingCartSuccess: ['shoppingCart'],
  shoppingCartAllSuccess: ['shoppingCartList', 'headers'],
  shoppingCartUpdateSuccess: ['shoppingCart'],
  shoppingCartDeleteSuccess: [],

  shoppingCartFailure: ['error'],
  shoppingCartAllFailure: ['error'],
  shoppingCartUpdateFailure: ['error'],
  shoppingCartDeleteFailure: ['error'],

  shoppingCartReset: [],
});

export const ShoppingCartTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  shoppingCart: { id: undefined },
  shoppingCartList: [],
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
    shoppingCart: INITIAL_STATE.shoppingCart,
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
  const { shoppingCart } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    shoppingCart,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { shoppingCartList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    shoppingCartList: loadMoreDataWhenScrolled(state.shoppingCartList, shoppingCartList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { shoppingCart } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    shoppingCart,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    shoppingCart: INITIAL_STATE.shoppingCart,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    shoppingCart: INITIAL_STATE.shoppingCart,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    shoppingCartList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    shoppingCart: state.shoppingCart,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    shoppingCart: state.shoppingCart,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOPPING_CART_REQUEST]: request,
  [Types.SHOPPING_CART_ALL_REQUEST]: allRequest,
  [Types.SHOPPING_CART_UPDATE_REQUEST]: updateRequest,
  [Types.SHOPPING_CART_DELETE_REQUEST]: deleteRequest,

  [Types.SHOPPING_CART_SUCCESS]: success,
  [Types.SHOPPING_CART_ALL_SUCCESS]: allSuccess,
  [Types.SHOPPING_CART_UPDATE_SUCCESS]: updateSuccess,
  [Types.SHOPPING_CART_DELETE_SUCCESS]: deleteSuccess,

  [Types.SHOPPING_CART_FAILURE]: failure,
  [Types.SHOPPING_CART_ALL_FAILURE]: allFailure,
  [Types.SHOPPING_CART_UPDATE_FAILURE]: updateFailure,
  [Types.SHOPPING_CART_DELETE_FAILURE]: deleteFailure,
  [Types.SHOPPING_CART_RESET]: reset,
});
