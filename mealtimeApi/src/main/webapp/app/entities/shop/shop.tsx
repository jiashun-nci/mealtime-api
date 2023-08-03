import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IShop } from 'app/shared/model/shop.model';
import { getEntities } from './shop.reducer';

export const Shop = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const shopList = useAppSelector(state => state.shop.entities);
  const loading = useAppSelector(state => state.shop.loading);
  const totalItems = useAppSelector(state => state.shop.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="shop-heading" data-cy="ShopHeading">
        <Translate contentKey="mealtimeApp.shop.home.title">Shops</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="mealtimeApp.shop.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/shop/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="mealtimeApp.shop.home.createLabel">Create new Shop</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {shopList && shopList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="mealtimeApp.shop.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="mealtimeApp.shop.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  <Translate contentKey="mealtimeApp.shop.phone">Phone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('addressLine1')}>
                  <Translate contentKey="mealtimeApp.shop.addressLine1">Address Line 1</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('addressLine2')}>
                  <Translate contentKey="mealtimeApp.shop.addressLine2">Address Line 2</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('city')}>
                  <Translate contentKey="mealtimeApp.shop.city">City</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('country')}>
                  <Translate contentKey="mealtimeApp.shop.country">Country</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('shopImage')}>
                  <Translate contentKey="mealtimeApp.shop.shopImage">Shop Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('deliveryFee')}>
                  <Translate contentKey="mealtimeApp.shop.deliveryFee">Delivery Fee</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="mealtimeApp.shop.user">User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shopList.map((shop, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/shop/${shop.id}`} color="link" size="sm">
                      {shop.id}
                    </Button>
                  </td>
                  <td>{shop.name}</td>
                  <td>{shop.phone}</td>
                  <td>{shop.addressLine1}</td>
                  <td>{shop.addressLine2}</td>
                  <td>{shop.city}</td>
                  <td>{shop.country}</td>
                  <td>
                    {shop.shopImage ? (
                      <div>
                        {shop.shopImageContentType ? (
                          <a onClick={openFile(shop.shopImageContentType, shop.shopImage)}>
                            <img src={`data:${shop.shopImageContentType};base64,${shop.shopImage}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {shop.shopImageContentType}, {byteSize(shop.shopImage)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{shop.deliveryFee}</td>
                  <td>{shop.user ? shop.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/shop/${shop.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/shop/${shop.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/shop/${shop.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="mealtimeApp.shop.home.notFound">No Shops found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={shopList && shopList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Shop;
