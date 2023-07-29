import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer-details.reducer';

export const CustomerDetailsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const customerDetailsEntity = useAppSelector(state => state.customerDetails.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="customerDetailsDetailsHeading">
          <Translate contentKey="mealtimeApp.customerDetails.detail.title">CustomerDetails</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{customerDetailsEntity.id}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="mealtimeApp.customerDetails.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{customerDetailsEntity.gender}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="mealtimeApp.customerDetails.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{customerDetailsEntity.phone}</dd>
          <dt>
            <span id="birthday">
              <Translate contentKey="mealtimeApp.customerDetails.birthday">Birthday</Translate>
            </span>
          </dt>
          <dd>
            {customerDetailsEntity.birthday ? (
              <TextFormat value={customerDetailsEntity.birthday} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="addressLine1">
              <Translate contentKey="mealtimeApp.customerDetails.addressLine1">Address Line 1</Translate>
            </span>
          </dt>
          <dd>{customerDetailsEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">
              <Translate contentKey="mealtimeApp.customerDetails.addressLine2">Address Line 2</Translate>
            </span>
          </dt>
          <dd>{customerDetailsEntity.addressLine2}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="mealtimeApp.customerDetails.city">City</Translate>
            </span>
          </dt>
          <dd>{customerDetailsEntity.city}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="mealtimeApp.customerDetails.country">Country</Translate>
            </span>
          </dt>
          <dd>{customerDetailsEntity.country}</dd>
          <dt>
            <span id="avatar">
              <Translate contentKey="mealtimeApp.customerDetails.avatar">Avatar</Translate>
            </span>
          </dt>
          <dd>
            {customerDetailsEntity.avatar ? (
              <div>
                {customerDetailsEntity.avatarContentType ? (
                  <a onClick={openFile(customerDetailsEntity.avatarContentType, customerDetailsEntity.avatar)}>
                    <img
                      src={`data:${customerDetailsEntity.avatarContentType};base64,${customerDetailsEntity.avatar}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {customerDetailsEntity.avatarContentType}, {byteSize(customerDetailsEntity.avatar)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="mealtimeApp.customerDetails.user">User</Translate>
          </dt>
          <dd>{customerDetailsEntity.user ? customerDetailsEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer-details" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-details/${customerDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerDetailsDetail;
