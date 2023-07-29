import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { RegisterTypes } from '../../modules/account/register/register.reducer';
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer';
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { ProductTypes } from '../../modules/entities/product/product.reducer';
import { ProductCategoryTypes } from '../../modules/entities/product-category/product-category.reducer';
import { ProductAttributeTypes } from '../../modules/entities/product-attribute/product-attribute.reducer';
import { ShopTypes } from '../../modules/entities/shop/shop.reducer';
import { CustomerDetailsTypes } from '../../modules/entities/customer-details/customer-details.reducer';
import { ShoppingCartTypes } from '../../modules/entities/shopping-cart/shopping-cart.reducer';
import { OrderTypes } from '../../modules/entities/order/order.reducer';
import { OrderItemTypes } from '../../modules/entities/order-item/order-item.reducer';
import { RiderTypes } from '../../modules/entities/rider/rider.reducer';
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { login, logout, loginLoad } from '../../modules/login/login.sagas';
import { register } from '../../modules/account/register/register.sagas';
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas';
import { changePassword } from '../../modules/account/password/change-password.sagas';
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import ProductSagas from '../../modules/entities/product/product.sagas';
import ProductCategorySagas from '../../modules/entities/product-category/product-category.sagas';
import ProductAttributeSagas from '../../modules/entities/product-attribute/product-attribute.sagas';
import ShopSagas from '../../modules/entities/shop/shop.sagas';
import CustomerDetailsSagas from '../../modules/entities/customer-details/customer-details.sagas';
import ShoppingCartSagas from '../../modules/entities/shopping-cart/shopping-cart.sagas';
import OrderSagas from '../../modules/entities/order/order.sagas';
import OrderItemSagas from '../../modules/entities/order-item/order-item.sagas';
import RiderSagas from '../../modules/entities/rider/rider.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(ProductTypes.PRODUCT_REQUEST, ProductSagas.getProduct, api),
    takeLatest(ProductTypes.PRODUCT_ALL_REQUEST, ProductSagas.getAllProducts, api),
    takeLatest(ProductTypes.PRODUCT_UPDATE_REQUEST, ProductSagas.updateProduct, api),
    takeLatest(ProductTypes.PRODUCT_DELETE_REQUEST, ProductSagas.deleteProduct, api),

    takeLatest(ProductCategoryTypes.PRODUCT_CATEGORY_REQUEST, ProductCategorySagas.getProductCategory, api),
    takeLatest(ProductCategoryTypes.PRODUCT_CATEGORY_ALL_REQUEST, ProductCategorySagas.getAllProductCategories, api),
    takeLatest(ProductCategoryTypes.PRODUCT_CATEGORY_UPDATE_REQUEST, ProductCategorySagas.updateProductCategory, api),
    takeLatest(ProductCategoryTypes.PRODUCT_CATEGORY_DELETE_REQUEST, ProductCategorySagas.deleteProductCategory, api),

    takeLatest(ProductAttributeTypes.PRODUCT_ATTRIBUTE_REQUEST, ProductAttributeSagas.getProductAttribute, api),
    takeLatest(ProductAttributeTypes.PRODUCT_ATTRIBUTE_ALL_REQUEST, ProductAttributeSagas.getAllProductAttributes, api),
    takeLatest(ProductAttributeTypes.PRODUCT_ATTRIBUTE_UPDATE_REQUEST, ProductAttributeSagas.updateProductAttribute, api),
    takeLatest(ProductAttributeTypes.PRODUCT_ATTRIBUTE_DELETE_REQUEST, ProductAttributeSagas.deleteProductAttribute, api),

    takeLatest(ShopTypes.SHOP_REQUEST, ShopSagas.getShop, api),
    takeLatest(ShopTypes.SHOP_ALL_REQUEST, ShopSagas.getAllShops, api),
    takeLatest(ShopTypes.SHOP_UPDATE_REQUEST, ShopSagas.updateShop, api),
    takeLatest(ShopTypes.SHOP_DELETE_REQUEST, ShopSagas.deleteShop, api),

    takeLatest(CustomerDetailsTypes.CUSTOMER_DETAILS_REQUEST, CustomerDetailsSagas.getCustomerDetails, api),
    takeLatest(CustomerDetailsTypes.CUSTOMER_DETAILS_ALL_REQUEST, CustomerDetailsSagas.getAllCustomerDetails, api),
    takeLatest(CustomerDetailsTypes.CUSTOMER_DETAILS_UPDATE_REQUEST, CustomerDetailsSagas.updateCustomerDetails, api),
    takeLatest(CustomerDetailsTypes.CUSTOMER_DETAILS_DELETE_REQUEST, CustomerDetailsSagas.deleteCustomerDetails, api),

    takeLatest(ShoppingCartTypes.SHOPPING_CART_REQUEST, ShoppingCartSagas.getShoppingCart, api),
    takeLatest(ShoppingCartTypes.SHOPPING_CART_ALL_REQUEST, ShoppingCartSagas.getAllShoppingCarts, api),
    takeLatest(ShoppingCartTypes.SHOPPING_CART_UPDATE_REQUEST, ShoppingCartSagas.updateShoppingCart, api),
    takeLatest(ShoppingCartTypes.SHOPPING_CART_DELETE_REQUEST, ShoppingCartSagas.deleteShoppingCart, api),

    takeLatest(OrderTypes.ORDER_REQUEST, OrderSagas.getOrder, api),
    takeLatest(OrderTypes.ORDER_ALL_REQUEST, OrderSagas.getAllOrders, api),
    takeLatest(OrderTypes.ORDER_UPDATE_REQUEST, OrderSagas.updateOrder, api),
    takeLatest(OrderTypes.ORDER_DELETE_REQUEST, OrderSagas.deleteOrder, api),

    takeLatest(OrderItemTypes.ORDER_ITEM_REQUEST, OrderItemSagas.getOrderItem, api),
    takeLatest(OrderItemTypes.ORDER_ITEM_ALL_REQUEST, OrderItemSagas.getAllOrderItems, api),
    takeLatest(OrderItemTypes.ORDER_ITEM_UPDATE_REQUEST, OrderItemSagas.updateOrderItem, api),
    takeLatest(OrderItemTypes.ORDER_ITEM_DELETE_REQUEST, OrderItemSagas.deleteOrderItem, api),

    takeLatest(RiderTypes.RIDER_REQUEST, RiderSagas.getRider, api),
    takeLatest(RiderTypes.RIDER_ALL_REQUEST, RiderSagas.getAllRiders, api),
    takeLatest(RiderTypes.RIDER_UPDATE_REQUEST, RiderSagas.updateRider, api),
    takeLatest(RiderTypes.RIDER_DELETE_REQUEST, RiderSagas.deleteRider, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserTypes.USER_REQUEST, UserSagas.getUser, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, UserSagas.updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, UserSagas.deleteUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
