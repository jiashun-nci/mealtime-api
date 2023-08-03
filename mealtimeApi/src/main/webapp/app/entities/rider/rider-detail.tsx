import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './rider.reducer';

export const RiderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const riderEntity = useAppSelector(state => state.rider.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="riderDetailsHeading">
          <Translate contentKey="mealtimeApp.rider.detail.title">Rider</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{riderEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="mealtimeApp.rider.name">Name</Translate>
            </span>
          </dt>
          <dd>{riderEntity.name}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="mealtimeApp.rider.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{riderEntity.phone}</dd>
          <dt>
            <span id="avatar">
              <Translate contentKey="mealtimeApp.rider.avatar">Avatar</Translate>
            </span>
          </dt>
          <dd>
            {riderEntity.avatar ? (
              <div>
                {riderEntity.avatarContentType ? (
                  <a onClick={openFile(riderEntity.avatarContentType, riderEntity.avatar)}>
                    <img src={`data:${riderEntity.avatarContentType};base64,${riderEntity.avatar}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {riderEntity.avatarContentType}, {byteSize(riderEntity.avatar)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="mealtimeApp.rider.user">User</Translate>
          </dt>
          <dd>{riderEntity.user ? riderEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/rider" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rider/${riderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RiderDetail;
