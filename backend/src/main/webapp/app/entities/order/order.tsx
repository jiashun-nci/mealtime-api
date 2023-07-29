import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOrder } from 'app/shared/model/order.model';
import { getEntities } from './order.reducer';

export const Order = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const orderList = useAppSelector(state => state.order.entities);
  const loading = useAppSelector(state => state.order.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="order-heading" data-cy="OrderHeading">
        <Translate contentKey="mealtimeApp.order.home.title">Orders</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="mealtimeApp.order.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/order/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="mealtimeApp.order.home.createLabel">Create new Order</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {orderList && orderList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="mealtimeApp.order.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.order.placedDate">Placed Date</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.order.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.order.totalPrice">Total Price</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.order.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.order.paymentMethod">Payment Method</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.order.paymentReference">Payment Reference</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.order.rider">Rider</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.order.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.order.cart">Cart</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orderList.map((order, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/order/${order.id}`} color="link" size="sm">
                      {order.id}
                    </Button>
                  </td>
                  <td>{order.placedDate ? <TextFormat type="date" value={order.placedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <Translate contentKey={`mealtimeApp.OrderStatus.${order.status}`} />
                  </td>
                  <td>
                    <Translate contentKey={`mealtimeApp.PaymentMethod.${order.paymentMethod}`} />
                  </td>
                  <td>{order.paymentReference}</td>
                  <td>{order.rider ? <Link to={`/rider/${order.rider.id}`}>{order.rider.name}</Link> : ''}</td>
                  <td>{order.user ? order.user.name : ''}</td>
                  <td>{order.cart ? <Link to={`/shopping-cart/${order.cart.id}`}>{order.cart.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/order/${order.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/order/${order.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/order/${order.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="mealtimeApp.order.home.notFound">No Orders found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Order;
