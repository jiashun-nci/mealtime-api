import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import OrderItemActions from './order-item.reducer';
import styles from './order-item-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function OrderItemScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { orderItem, orderItemList, getAllOrderItems, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('OrderItem entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchOrderItems();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [orderItem, fetchOrderItems]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('OrderItemDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No OrderItems Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchOrderItems = React.useCallback(() => {
    getAllOrderItems({ page: page - 1, sort, size });
  }, [getAllOrderItems, page, sort, size]);

  const handleLoadMore = () => {
    if (orderItemList.length) {
      return;
    }
    setPage(page + 1);
    fetchOrderItems();
  };
  return (
    <View style={styles.container} testID="orderItemScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={orderItemList}
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
    orderItemList: state.orderItems.orderItemList,
    orderItem: state.orderItems.orderItem,
    fetching: state.orderItems.fetchingAll,
    error: state.orderItems.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrderItems: (options) => dispatch(OrderItemActions.orderItemAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemScreen);
