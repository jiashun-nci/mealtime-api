import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import RiderActions from './rider.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './rider-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  phone: Yup.string().required(),
});

function RiderEditScreen(props) {
  const { getRider, updateRider, route, rider, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getRider(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getRider, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(rider));
    }
  }, [rider, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('RiderDetail', { entityId: rider?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateRider(formValueToEntity(data));

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
  const avatarRef = createRef();
  const avatarContentTypeRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="riderEditScrollView"
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
    avatar: value.avatar ?? null,
    avatarContentType: value.avatarContentType ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    phone: value.phone ?? null,
    avatar: value.avatar ?? null,
    avatarContentType: value.avatarContentType ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    rider: state.riders.rider,
    fetching: state.riders.fetchingOne,
    updating: state.riders.updating,
    updateSuccess: state.riders.updateSuccess,
    errorUpdating: state.riders.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRider: (id) => dispatch(RiderActions.riderRequest(id)),
    getAllRiders: (options) => dispatch(RiderActions.riderAllRequest(options)),
    updateRider: (rider) => dispatch(RiderActions.riderUpdateRequest(rider)),
    reset: () => dispatch(RiderActions.riderReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RiderEditScreen);
