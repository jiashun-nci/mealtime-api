import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './shop.reducer';

export const ShopDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const shopEntity = useAppSelector(state => state.shop.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="shopDetailsHeading">
          <Translate contentKey="mealtimeApp.shop.detail.title">Shop</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{shopEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="mealtimeApp.shop.name">Name</Translate>
            </span>
          </dt>
          <dd>{shopEntity.name}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="mealtimeApp.shop.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{shopEntity.phone}</dd>
          <dt>
            <span id="addressLine1">
              <Translate contentKey="mealtimeApp.shop.addressLine1">Address Line 1</Translate>
            </span>
          </dt>
          <dd>{shopEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">
              <Translate contentKey="mealtimeApp.shop.addressLine2">Address Line 2</Translate>
            </span>
          </dt>
          <dd>{shopEntity.addressLine2}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="mealtimeApp.shop.city">City</Translate>
            </span>
          </dt>
          <dd>{shopEntity.city}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="mealtimeApp.shop.country">Country</Translate>
            </span>
          </dt>
          <dd>{shopEntity.country}</dd>
          <dt>
            <span id="shopImage">
              <Translate contentKey="mealtimeApp.shop.shopImage">Shop Image</Translate>
            </span>
          </dt>
          <dd>
            {shopEntity.shopImage ? (
              <div>
                {shopEntity.shopImageContentType ? (
                  <a onClick={openFile(shopEntity.shopImageContentType, shopEntity.shopImage)}>
                    <img src={`data:${shopEntity.shopImageContentType};base64,${shopEntity.shopImage}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {shopEntity.shopImageContentType}, {byteSize(shopEntity.shopImage)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="deliveryFee">
              <Translate contentKey="mealtimeApp.shop.deliveryFee">Delivery Fee</Translate>
            </span>
          </dt>
          <dd>{shopEntity.deliveryFee}</dd>
          <dt>
            <Translate contentKey="mealtimeApp.shop.user">User</Translate>
          </dt>
          <dd>{shopEntity.user ? shopEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/shop" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/shop/${shopEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ShopDetail;
