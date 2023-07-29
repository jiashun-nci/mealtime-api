import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IRider } from 'app/shared/model/rider.model';
import { getEntities } from './rider.reducer';

export const Rider = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const riderList = useAppSelector(state => state.rider.entities);
  const loading = useAppSelector(state => state.rider.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="rider-heading" data-cy="RiderHeading">
        <Translate contentKey="mealtimeApp.rider.home.title">Riders</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="mealtimeApp.rider.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/rider/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="mealtimeApp.rider.home.createLabel">Create new Rider</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {riderList && riderList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="mealtimeApp.rider.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.rider.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.rider.phone">Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.rider.avatar">Avatar</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {riderList.map((rider, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/rider/${rider.id}`} color="link" size="sm">
                      {rider.id}
                    </Button>
                  </td>
                  <td>{rider.name}</td>
                  <td>{rider.phone}</td>
                  <td>
                    {rider.avatar ? (
                      <div>
                        {rider.avatarContentType ? (
                          <a onClick={openFile(rider.avatarContentType, rider.avatar)}>
                            <img src={`data:${rider.avatarContentType};base64,${rider.avatar}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {rider.avatarContentType}, {byteSize(rider.avatar)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/rider/${rider.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/rider/${rider.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/rider/${rider.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="mealtimeApp.rider.home.notFound">No Riders found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Rider;
