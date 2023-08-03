import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ShoppingCartActions from './shopping-cart.reducer';
import styles from './shopping-cart-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ShoppingCartScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { shoppingCart, shoppingCartList, getAllShoppingCarts, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('ShoppingCart entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchShoppingCarts();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [shoppingCart, fetchShoppingCarts]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ShoppingCartDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No ShoppingCarts Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchShoppingCarts = React.useCallback(() => {
    getAllShoppingCarts({ page: page - 1, sort, size });
  }, [getAllShoppingCarts, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchShoppingCarts();
  };
  return (
    <View style={styles.container} testID="shoppingCartScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={shoppingCartList}
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
    shoppingCartList: state.shoppingCarts.shoppingCartList,
    shoppingCart: state.shoppingCarts.shoppingCart,
    fetching: state.shoppingCarts.fetchingAll,
    error: state.shoppingCarts.errorAll,
    links: state.shoppingCarts.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllShoppingCarts: (options) => dispatch(ShoppingCartActions.shoppingCartAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);
