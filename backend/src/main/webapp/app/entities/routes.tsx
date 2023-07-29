import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Product from './product';
import ProductCategory from './product-category';
import ProductAttribute from './product-attribute';
import Shop from './shop';
import CustomerDetails from './customer-details';
import ShoppingCart from './shopping-cart';
import Order from './order';
import OrderItem from './order-item';
import Rider from './rider';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="product/*" element={<Product />} />
        <Route path="product-category/*" element={<ProductCategory />} />
        <Route path="product-attribute/*" element={<ProductAttribute />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="customer-details/*" element={<CustomerDetails />} />
        <Route path="shopping-cart/*" element={<ShoppingCart />} />
        <Route path="order/*" element={<Order />} />
        <Route path="order-item/*" element={<OrderItem />} />
        <Route path="rider/*" element={<Rider />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
