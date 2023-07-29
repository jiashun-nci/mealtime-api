import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Shop from './shop';
import ShopDetail from './shop-detail';
import ShopUpdate from './shop-update';
import ShopDeleteDialog from './shop-delete-dialog';

const ShopRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Shop />} />
    <Route path="new" element={<ShopUpdate />} />
    <Route path=":id">
      <Route index element={<ShopDetail />} />
      <Route path="edit" element={<ShopUpdate />} />
      <Route path="delete" element={<ShopDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ShopRoutes;
