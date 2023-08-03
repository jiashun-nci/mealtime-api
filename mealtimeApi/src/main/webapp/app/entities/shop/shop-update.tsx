import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IShop } from 'app/shared/model/shop.model';
import { getEntity, updateEntity, createEntity, reset } from './shop.reducer';

export const ShopUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const shopEntity = useAppSelector(state => state.shop.entity);
  const loading = useAppSelector(state => state.shop.loading);
  const updating = useAppSelector(state => state.shop.updating);
  const updateSuccess = useAppSelector(state => state.shop.updateSuccess);

  const handleClose = () => {
    navigate('/shop' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...shopEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...shopEntity,
          user: shopEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="mealtimeApp.shop.home.createOrEditLabel" data-cy="ShopCreateUpdateHeading">
            <Translate contentKey="mealtimeApp.shop.home.createOrEditLabel">Create or edit a Shop</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="shop-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('mealtimeApp.shop.name')}
                id="shop-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('mealtimeApp.shop.phone')}
                id="shop-phone"
                name="phone"
                data-cy="phone"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('mealtimeApp.shop.addressLine1')}
                id="shop-addressLine1"
                name="addressLine1"
                data-cy="addressLine1"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('mealtimeApp.shop.addressLine2')}
                id="shop-addressLine2"
                name="addressLine2"
                data-cy="addressLine2"
                type="text"
              />
              <ValidatedField label={translate('mealtimeApp.shop.city')} id="shop-city" name="city" data-cy="city" type="text" />
              <ValidatedField
                label={translate('mealtimeApp.shop.country')}
                id="shop-country"
                name="country"
                data-cy="country"
                type="text"
              />
              <ValidatedBlobField
                label={translate('mealtimeApp.shop.shopImage')}
                id="shop-shopImage"
                name="shopImage"
                data-cy="shopImage"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('mealtimeApp.shop.deliveryFee')}
                id="shop-deliveryFee"
                name="deliveryFee"
                data-cy="deliveryFee"
                type="text"
                validate={{
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField id="shop-user" name="user" data-cy="user" label={translate('mealtimeApp.shop.user')} type="select" required>
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/shop" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ShopUpdate;
