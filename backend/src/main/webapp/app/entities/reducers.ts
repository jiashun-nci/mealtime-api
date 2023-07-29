import product from 'app/entities/product/product.reducer';
import productCategory from 'app/entities/product-category/product-category.reducer';
import productAttribute from 'app/entities/product-attribute/product-attribute.reducer';
import shop from 'app/entities/shop/shop.reducer';
import customerDetails from 'app/entities/customer-details/customer-details.reducer';
import shoppingCart from 'app/entities/shopping-cart/shopping-cart.reducer';
import order from 'app/entities/order/order.reducer';
import orderItem from 'app/entities/order-item/order-item.reducer';
import rider from 'app/entities/rider/rider.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  product,
  productCategory,
  productAttribute,
  shop,
  customerDetails,
  shoppingCart,
  order,
  orderItem,
  rider,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
