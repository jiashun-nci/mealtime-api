import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product-attribute.reducer';

export const ProductAttributeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productAttributeEntity = useAppSelector(state => state.productAttribute.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productAttributeDetailsHeading">
          <Translate contentKey="mealtimeApp.productAttribute.detail.title">ProductAttribute</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productAttributeEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="mealtimeApp.productAttribute.name">Name</Translate>
            </span>
          </dt>
          <dd>{productAttributeEntity.name}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="mealtimeApp.productAttribute.value">Value</Translate>
            </span>
          </dt>
          <dd>{productAttributeEntity.value}</dd>
          <dt>
            <span id="priceExtra">
              <Translate contentKey="mealtimeApp.productAttribute.priceExtra">Price Extra</Translate>
            </span>
          </dt>
          <dd>{productAttributeEntity.priceExtra}</dd>
        </dl>
        <Button tag={Link} to="/product-attribute" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product-attribute/${productAttributeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductAttributeDetail;
