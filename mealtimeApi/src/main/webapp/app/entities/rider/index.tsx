import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Rider from './rider';
import RiderDetail from './rider-detail';
import RiderUpdate from './rider-update';
import RiderDeleteDialog from './rider-delete-dialog';

const RiderRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Rider />} />
    <Route path="new" element={<RiderUpdate />} />
    <Route path=":id">
      <Route index element={<RiderDetail />} />
      <Route path="edit" element={<RiderUpdate />} />
      <Route path="delete" element={<RiderDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default RiderRoutes;
