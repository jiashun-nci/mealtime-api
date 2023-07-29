import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ShopActions from './shop.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './shop-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  phone: Yup.string().required(),
  addressLine1: Yup.string().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
  deliveryFee: Yup.number().min(0),
  user: Yup.mixed().required(),
});

function ShopEditScreen(props) {
  const { getShop, updateShop, route, shop, fetching, updating, errorUpdating, updateSuccess, navigation, reset, getAllUsers, userList } =
    props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getShop(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getShop, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(shop));
    }
  }, [shop, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ShopDetail', { entityId: shop?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateShop(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const phoneRef = createRef();
  const addressLine1Ref = createRef();
  const addressLine2Ref = createRef();
  const cityRef = createRef();
  const countryRef = createRef();
  const shopImageRef = createRef();
  const shopImageContentTypeRef = createRef();
  const deliveryFeeRef = createRef();
  const userRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="shopEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => phoneRef.current?.focus()}
            />
            <FormField
              name="phone"
              ref={phoneRef}
              label="Phone"
              placeholder="Enter Phone"
              testID="phoneInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => addressLine1Ref.current?.focus()}
            />
            <FormField
              name="addressLine1"
              ref={addressLine1Ref}
              label="Address Line 1"
              placeholder="Enter Address Line 1"
              testID="addressLine1Input"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => addressLine2Ref.current?.focus()}
            />
            <FormField
              name="addressLine2"
              ref={addressLine2Ref}
              label="Address Line 2"
              placeholder="Enter Address Line 2"
              testID="addressLine2Input"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => cityRef.current?.focus()}
            />
            <FormField
              name="city"
              ref={cityRef}
              label="City"
              placeholder="Enter City"
              testID="cityInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => countryRef.current?.focus()}
            />
            <FormField
              name="country"
              ref={countryRef}
              label="Country"
              placeholder="Enter Country"
              testID="countryInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => shopImageRef.current?.focus()}
            />
            <FormField
              name="shopImage"
              ref={shopImageRef}
              label="Shop Image"
              placeholder="Enter Shop Image"
              testID="shopImageInput"
              inputType="image-base64"
              onSubmitEditing={() => shopImageContentTypeRef.current?.focus()}
            />
            <FormField
              name="shopImageContentType"
              ref={shopImageContentTypeRef}
              label="Shop Image Content Type"
              placeholder="Enter Shop Image Content Type"
              testID="shopImageContentTypeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => deliveryFeeRef.current?.focus()}
            />
            <FormField
              name="deliveryFee"
              ref={deliveryFeeRef}
              label="Delivery Fee"
              placeholder="Enter Delivery Fee"
              testID="deliveryFeeInput"
              inputType="number"
            />
            <FormField
              name="user"
              inputType="select-one"
              ref={userRef}
              listItems={userList}
              listItemLabelField="login"
              label="User"
              placeholder="Select User"
              testID="userSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    name: value.name ?? null,
    phone: value.phone ?? null,
    addressLine1: value.addressLine1 ?? null,
    addressLine2: value.addressLine2 ?? null,
    city: value.city ?? null,
    country: value.country ?? null,
    shopImage: value.shopImage ?? null,
    shopImageContentType: value.shopImageContentType ?? null,
    deliveryFee: value.deliveryFee ?? null,
    user: value.user && value.user.id ? value.user.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    phone: value.phone ?? null,
    addressLine1: value.addressLine1 ?? null,
    addressLine2: value.addressLine2 ?? null,
    city: value.city ?? null,
    country: value.country ?? null,
    shopImage: value.shopImage ?? null,
    shopImageContentType: value.shopImageContentType ?? null,
    deliveryFee: value.deliveryFee ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.userList ?? [],
    shop: state.shops.shop,
    fetching: state.shops.fetchingOne,
    updating: state.shops.updating,
    updateSuccess: state.shops.updateSuccess,
    errorUpdating: state.shops.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getShop: (id) => dispatch(ShopActions.shopRequest(id)),
    getAllShops: (options) => dispatch(ShopActions.shopAllRequest(options)),
    updateShop: (shop) => dispatch(ShopActions.shopUpdateRequest(shop)),
    reset: () => dispatch(ShopActions.shopReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopEditScreen);
