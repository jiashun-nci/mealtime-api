import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOrderItem } from 'app/shared/model/order-item.model';
import { getEntities } from './order-item.reducer';

export const OrderItem = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const orderItemList = useAppSelector(state => state.orderItem.entities);
  const loading = useAppSelector(state => state.orderItem.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="order-item-heading" data-cy="OrderItemHeading">
        <Translate contentKey="mealtimeApp.orderItem.home.title">Order Items</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="mealtimeApp.orderItem.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/order-item/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="mealtimeApp.orderItem.home.createLabel">Create new Order Item</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {orderItemList && orderItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="mealtimeApp.orderItem.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.orderItem.placedDate">Placed Date</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.orderItem.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.orderItem.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.orderItem.order">Order</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.orderItem.product">Product</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orderItemList.map((orderItem, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/order-item/${orderItem.id}`} color="link" size="sm">
                      {orderItem.id}
                    </Button>
                  </td>
                  <td>{orderItem.placedDate ? <TextFormat type="date" value={orderItem.placedDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{orderItem.quantity}</td>
                  <td>{orderItem.price}</td>
                  <td>{orderItem.order ? <Link to={`/order/${orderItem.order.id}`}>{orderItem.order.id}</Link> : ''}</td>
                  <td>{orderItem.product ? <Link to={`/product/${orderItem.product.id}`}>{orderItem.product.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/order-item/${orderItem.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/order-item/${orderItem.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/order-item/${orderItem.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="mealtimeApp.orderItem.home.notFound">No Order Items found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OrderItem;
