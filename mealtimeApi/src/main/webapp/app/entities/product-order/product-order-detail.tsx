import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product-order.reducer';

export const ProductOrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productOrderEntity = useAppSelector(state => state.productOrder.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productOrderDetailsHeading">
          <Translate contentKey="mealtimeApp.productOrder.detail.title">ProductOrder</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productOrderEntity.id}</dd>
          <dt>
            <span id="placedDate">
              <Translate contentKey="mealtimeApp.productOrder.placedDate">Placed Date</Translate>
            </span>
          </dt>
          <dd>
            {productOrderEntity.placedDate ? (
              <TextFormat value={productOrderEntity.placedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="mealtimeApp.productOrder.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{productOrderEntity.quantity}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="mealtimeApp.productOrder.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{productOrderEntity.totalPrice}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="mealtimeApp.productOrder.status">Status</Translate>
            </span>
          </dt>
          <dd>{productOrderEntity.status}</dd>
          <dt>
            <span id="paymentMethod">
              <Translate contentKey="mealtimeApp.productOrder.paymentMethod">Payment Method</Translate>
            </span>
          </dt>
          <dd>{productOrderEntity.paymentMethod}</dd>
          <dt>
            <span id="paymentReference">
              <Translate contentKey="mealtimeApp.productOrder.paymentReference">Payment Reference</Translate>
            </span>
          </dt>
          <dd>{productOrderEntity.paymentReference}</dd>
          <dt>
            <Translate contentKey="mealtimeApp.productOrder.rider">Rider</Translate>
          </dt>
          <dd>{productOrderEntity.rider ? productOrderEntity.rider.name : ''}</dd>
          <dt>
            <Translate contentKey="mealtimeApp.productOrder.user">User</Translate>
          </dt>
          <dd>{productOrderEntity.user ? productOrderEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/product-order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product-order/${productOrderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductOrderDetail;
