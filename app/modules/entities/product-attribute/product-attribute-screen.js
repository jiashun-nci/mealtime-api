import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ProductAttributeActions from './product-attribute.reducer';
import styles from './product-attribute-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ProductAttributeScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { productAttribute, productAttributeList, getAllProductAttributes, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('ProductAttribute entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchProductAttributes();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [productAttribute, fetchProductAttributes]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductAttributeDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No ProductAttributes Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchProductAttributes = React.useCallback(() => {
    getAllProductAttributes({ page: page - 1, sort, size });
  }, [getAllProductAttributes, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchProductAttributes();
  };
  return (
    <View style={styles.container} testID="productAttributeScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={productAttributeList}
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
    productAttributeList: state.productAttributes.productAttributeList,
    productAttribute: state.productAttributes.productAttribute,
    fetching: state.productAttributes.fetchingAll,
    error: state.productAttributes.errorAll,
    links: state.productAttributes.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductAttributes: (options) => dispatch(ProductAttributeActions.productAttributeAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributeScreen);
