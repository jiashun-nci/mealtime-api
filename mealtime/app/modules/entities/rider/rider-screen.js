import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import RiderActions from './rider.reducer';
import styles from './rider-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function RiderScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { rider, riderList, getAllRiders, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Rider entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchRiders();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [rider, fetchRiders]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('RiderDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Riders Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchRiders = React.useCallback(() => {
    getAllRiders({ page: page - 1, sort, size });
  }, [getAllRiders, page, sort, size]);

  const handleLoadMore = () => {
    if (riderList.length) {
      return;
    }
    setPage(page + 1);
    fetchRiders();
  };
  return (
    <View style={styles.container} testID="riderScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={riderList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    riderList: state.riders.riderList,
    rider: state.riders.rider,
    fetching: state.riders.fetchingAll,
    error: state.riders.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRiders: (options) => dispatch(RiderActions.riderAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RiderScreen);
