import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import CustomerDetailsActions from './customer-details.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './customer-details-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  gender: Yup.string().required(),
  phone: Yup.string().required(),
  addressLine1: Yup.string().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
  user: Yup.mixed().required(),
});

const Gender = [
  {
    label: 'MALE',
    value: 'MALE',
  },
  {
    label: 'FEMALE',
    value: 'FEMALE',
  },
];

function CustomerDetailsEditScreen(props) {
  const {
    getCustomerDetails,
    updateCustomerDetails,
    route,
    customerDetails,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllUsers,
    userList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getCustomerDetails(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getCustomerDetails, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(customerDetails));
    }
  }, [customerDetails, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('CustomerDetailsDetail', { entityId: customerDetails?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateCustomerDetails(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const genderRef = createRef();
  const phoneRef = createRef();
  const birthdayRef = createRef();
  const addressLine1Ref = createRef();
  const addressLine2Ref = createRef();
  const cityRef = createRef();
  const countryRef = createRef();
  const avatarRef = createRef();
  const avatarContentTypeRef = createRef();
  const userRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="customerDetailsEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="gender"
              ref={genderRef}
              label="Gender"
              placeholder="Enter Gender"
              testID="genderInput"
              inputType="select-one"
              listItems={Gender}
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
              onSubmitEditing={() => birthdayRef.current?.focus()}
            />
            <FormField
              name="birthday"
              ref={birthdayRef}
              label="Birthday"
              placeholder="Enter Birthday"
              testID="birthdayInput"
              inputType="date"
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
              onSubmitEditing={() => avatarRef.current?.focus()}
            />
            <FormField
              name="avatar"
              ref={avatarRef}
              label="Avatar"
              placeholder="Enter Avatar"
              testID="avatarInput"
              inputType="image-base64"
              onSubmitEditing={() => avatarContentTypeRef.current?.focus()}
            />
            <FormField
              name="avatarContentType"
              ref={avatarContentTypeRef}
              label="Avatar Content Type"
              placeholder="Enter Avatar Content Type"
              testID="avatarContentTypeInput"
              inputType="text"
              autoCapitalize="none"
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
    gender: value.gender ?? null,
    phone: value.phone ?? null,
    birthday: value.birthday ?? null,
    addressLine1: value.addressLine1 ?? null,
    addressLine2: value.addressLine2 ?? null,
    city: value.city ?? null,
    country: value.country ?? null,
    avatar: value.avatar ?? null,
    avatarContentType: value.avatarContentType ?? null,
    user: value.user && value.user.id ? value.user.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    gender: value.gender ?? null,
    phone: value.phone ?? null,
    birthday: value.birthday ?? null,
    addressLine1: value.addressLine1 ?? null,
    addressLine2: value.addressLine2 ?? null,
    city: value.city ?? null,
    country: value.country ?? null,
    avatar: value.avatar ?? null,
    avatarContentType: value.avatarContentType ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.userList ?? [],
    customerDetails: state.customerDetails.customerDetails,
    fetching: state.customerDetails.fetchingOne,
    updating: state.customerDetails.updating,
    updateSuccess: state.customerDetails.updateSuccess,
    errorUpdating: state.customerDetails.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getCustomerDetails: (id) => dispatch(CustomerDetailsActions.customerDetailsRequest(id)),
    getAllCustomerDetails: (options) => dispatch(CustomerDetailsActions.customerDetailsAllRequest(options)),
    updateCustomerDetails: (customerDetails) => dispatch(CustomerDetailsActions.customerDetailsUpdateRequest(customerDetails)),
    reset: () => dispatch(CustomerDetailsActions.customerDetailsReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsEditScreen);
