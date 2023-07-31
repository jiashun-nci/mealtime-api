export default {
  // Functions return fixtures

  // entity fixtures
  updateProduct: (product) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-product.json'),
    };
  },
  getAllProducts: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-products.json'),
    };
  },
  getProduct: (productId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-product.json'),
    };
  },
  deleteProduct: (productId) => {
    return {
      ok: true,
    };
  },
  updateProductCategory: (productCategory) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-product-category.json'),
    };
  },
  getAllProductCategories: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-product-categories.json'),
    };
  },
  getProductCategory: (productCategoryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-product-category.json'),
    };
  },
  deleteProductCategory: (productCategoryId) => {
    return {
      ok: true,
    };
  },
  updateShop: (shop) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-shop.json'),
    };
  },
  getAllShops: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-shops.json'),
    };
  },
  getShop: (shopId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-shop.json'),
    };
  },
  deleteShop: (shopId) => {
    return {
      ok: true,
    };
  },
  updateCustomerDetails: (customerDetails) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-customer-details.json'),
    };
  },
  getAllCustomerDetails: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-customer-details.json'),
    };
  },
  getCustomerDetails: (customerDetailsId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-customer-details.json'),
    };
  },
  deleteCustomerDetails: (customerDetailsId) => {
    return {
      ok: true,
    };
  },
  updateShoppingCart: (shoppingCart) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-shopping-cart.json'),
    };
  },
  getAllShoppingCarts: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-shopping-carts.json'),
    };
  },
  getShoppingCart: (shoppingCartId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-shopping-cart.json'),
    };
  },
  deleteShoppingCart: (shoppingCartId) => {
    return {
      ok: true,
    };
  },
  updateProductOrder: (productOrder) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-product-order.json'),
    };
  },
  getAllProductOrders: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-product-orders.json'),
    };
  },
  getProductOrder: (productOrderId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-product-order.json'),
    };
  },
  deleteProductOrder: (productOrderId) => {
    return {
      ok: true,
    };
  },
  updateOrderItem: (orderItem) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-order-item.json'),
    };
  },
  getAllOrderItems: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-order-items.json'),
    };
  },
  getOrderItem: (orderItemId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-order-item.json'),
    };
  },
  deleteOrderItem: (orderItemId) => {
    return {
      ok: true,
    };
  },
  updateRider: (rider) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-rider.json'),
    };
  },
  getAllRiders: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-riders.json'),
    };
  },
  getRider: (riderId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-rider.json'),
    };
  },
  deleteRider: (riderId) => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      };
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () => {
    return {
      ok: true,
    };
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
