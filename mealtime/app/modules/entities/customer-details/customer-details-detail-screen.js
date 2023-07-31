import React from 'react';
import { ActivityIndicator, ScrollView, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { convertLocalDateToString } from '../../../shared/util/date-transforms';

import CustomerDetailsActions from './customer-details.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CustomerDetailsDeleteModal from './customer-details-delete-modal';
import styles from './customer-details-styles';

function CustomerDetailsDetailScreen(props) {
  const { route, getCustomerDetails, navigation, customerDetails, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = customerDetails?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('CustomerDetails');
      } else {
        setDeleteModalVisible(false);
        getCustomerDetails(routeEntityId);
      }
    }, [routeEntityId, getCustomerDetails, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the CustomerDetails.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="customerDetailsDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{customerDetails.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{customerDetails.name}</Text>
      {/* Gender Field */}
      <Text style={styles.label}>Gender:</Text>
      <Text testID="gender">{customerDetails.gender}</Text>
      {/* Phone Field */}
      <Text style={styles.label}>Phone:</Text>
      <Text testID="phone">{customerDetails.phone}</Text>
      {/* Birthday Field */}
      <Text style={styles.label}>Birthday:</Text>
      <Text testID="birthday">{convertLocalDateToString(customerDetails.birthday)}</Text>
      {/* AddressLine1 Field */}
      <Text style={styles.label}>AddressLine1:</Text>
      <Text testID="addressLine1">{customerDetails.addressLine1}</Text>
      {/* AddressLine2 Field */}
      <Text style={styles.label}>AddressLine2:</Text>
      <Text testID="addressLine2">{customerDetails.addressLine2}</Text>
      {/* City Field */}
      <Text style={styles.label}>City:</Text>
      <Text testID="city">{customerDetails.city}</Text>
      {/* Country Field */}
      <Text style={styles.label}>Country:</Text>
      <Text testID="country">{customerDetails.country}</Text>
      {/* Avatar Field */}
      <Text style={styles.label}>Avatar:</Text>
      <Text testID="avatarContentType">{customerDetails.avatarContentType}</Text>
      <Image
        testID="avatar"
        style={styles.imageBlob}
        source={{ uri: `data:${customerDetails.avatarContentType};base64,${customerDetails.avatar}` }}
      />
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(customerDetails.user ? customerDetails.user.login : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CustomerDetailsEdit', { entityId })}
          accessibilityLabel={'CustomerDetails Edit Button'}
          testID="customerDetailsEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'CustomerDetails Delete Button'}
          testID="customerDetailsDeleteButton"
        />
        {deleteModalVisible && (
          <CustomerDetailsDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={customerDetails}
            testID="customerDetailsDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    customerDetails: state.customerDetails.customerDetails,
    error: state.customerDetails.errorOne,
    fetching: state.customerDetails.fetchingOne,
    deleting: state.customerDetails.deleting,
    errorDeleting: state.customerDetails.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerDetails: (id) => dispatch(CustomerDetailsActions.customerDetailsRequest(id)),
    getAllCustomerDetails: (options) => dispatch(CustomerDetailsActions.customerDetailsAllRequest(options)),
    deleteCustomerDetails: (id) => dispatch(CustomerDetailsActions.customerDetailsDeleteRequest(id)),
    resetCustomerDetails: () => dispatch(CustomerDetailsActions.customerDetailsReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsDetailScreen);
