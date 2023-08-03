import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './order-item.reducer';

export const OrderItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const orderItemEntity = useAppSelector(state => state.orderItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderItemDetailsHeading">
          <Translate contentKey="mealtimeApp.orderItem.detail.title">OrderItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.id}</dd>
          <dt>
            <span id="placedDate">
              <Translate contentKey="mealtimeApp.orderItem.placedDate">Placed Date</Translate>
            </span>
          </dt>
          <dd>
            {orderItemEntity.placedDate ? <TextFormat value={orderItemEntity.placedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="mealtimeApp.orderItem.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.quantity}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="mealtimeApp.orderItem.price">Price</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.price}</dd>
          <dt>
            <Translate contentKey="mealtimeApp.orderItem.productOrder">Product Order</Translate>
          </dt>
          <dd>{orderItemEntity.productOrder ? orderItemEntity.productOrder.id : ''}</dd>
          <dt>
            <Translate contentKey="mealtimeApp.orderItem.product">Product</Translate>
          </dt>
          <dd>{orderItemEntity.product ? orderItemEntity.product.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/order-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order-item/${orderItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderItemDetail;
