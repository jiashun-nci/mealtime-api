import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './order.reducer';

export const OrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsHeading">
          <Translate contentKey="mealtimeApp.order.detail.title">Order</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderEntity.id}</dd>
          <dt>
            <span id="placedDate">
              <Translate contentKey="mealtimeApp.order.placedDate">Placed Date</Translate>
            </span>
          </dt>
          <dd>{orderEntity.placedDate ? <TextFormat value={orderEntity.placedDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="mealtimeApp.order.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{orderEntity.quantity}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="mealtimeApp.order.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{orderEntity.totalPrice}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="mealtimeApp.order.status">Status</Translate>
            </span>
          </dt>
          <dd>{orderEntity.status}</dd>
          <dt>
            <span id="paymentMethod">
              <Translate contentKey="mealtimeApp.order.paymentMethod">Payment Method</Translate>
            </span>
          </dt>
          <dd>{orderEntity.paymentMethod}</dd>
          <dt>
            <span id="paymentReference">
              <Translate contentKey="mealtimeApp.order.paymentReference">Payment Reference</Translate>
            </span>
          </dt>
          <dd>{orderEntity.paymentReference}</dd>
          <dt>
            <Translate contentKey="mealtimeApp.order.rider">Rider</Translate>
          </dt>
          <dd>{orderEntity.rider ? orderEntity.rider.name : ''}</dd>
          <dt>
            <Translate contentKey="mealtimeApp.order.user">User</Translate>
          </dt>
          <dd>{orderEntity.user ? orderEntity.user.name : ''}</dd>
          <dt>
            <Translate contentKey="mealtimeApp.order.cart">Cart</Translate>
          </dt>
          <dd>{orderEntity.cart ? orderEntity.cart.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetail;
