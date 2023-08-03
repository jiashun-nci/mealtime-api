import React from 'react';
import { ActivityIndicator, ScrollView, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import RiderActions from './rider.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import RiderDeleteModal from './rider-delete-modal';
import styles from './rider-styles';

function RiderDetailScreen(props) {
  const { route, getRider, navigation, rider, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = rider?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Rider');
      } else {
        setDeleteModalVisible(false);
        getRider(routeEntityId);
      }
    }, [routeEntityId, getRider, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Rider.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="riderDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{rider.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{rider.name}</Text>
      {/* Phone Field */}
      <Text style={styles.label}>Phone:</Text>
      <Text testID="phone">{rider.phone}</Text>
      {/* Avatar Field */}
      <Text style={styles.label}>Avatar:</Text>
      <Text testID="avatarContentType">{rider.avatarContentType}</Text>
      <Image testID="avatar" style={styles.imageBlob} source={{ uri: `data:${rider.avatarContentType};base64,${rider.avatar}` }} />
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(rider.user ? rider.user.login : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('RiderEdit', { entityId })}
          accessibilityLabel={'Rider Edit Button'}
          testID="riderEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Rider Delete Button'}
          testID="riderDeleteButton"
        />
        {deleteModalVisible && (
          <RiderDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={rider}
            testID="riderDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    rider: state.riders.rider,
    error: state.riders.errorOne,
    fetching: state.riders.fetchingOne,
    deleting: state.riders.deleting,
    errorDeleting: state.riders.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRider: (id) => dispatch(RiderActions.riderRequest(id)),
    getAllRiders: (options) => dispatch(RiderActions.riderAllRequest(options)),
    deleteRider: (id) => dispatch(RiderActions.riderDeleteRequest(id)),
    resetRiders: () => dispatch(RiderActions.riderReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RiderDetailScreen);
