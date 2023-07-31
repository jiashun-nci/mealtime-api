import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ShopActions from './shop.reducer';
import styles from './shop-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ShopScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { shop, shopList, getAllShops, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Shop entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchShops();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [shop, fetchShops]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ShopDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Shops Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchShops = React.useCallback(() => {
    getAllShops({ page: page - 1, sort, size });
  }, [getAllShops, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchShops();
  };
  return (
    <View style={styles.container} testID="shopScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={shopList}
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
    shopList: state.shops.shopList,
    shop: state.shops.shop,
    fetching: state.shops.fetchingAll,
    error: state.shops.errorAll,
    links: state.shops.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllShops: (options) => dispatch(ShopActions.shopAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopScreen);
