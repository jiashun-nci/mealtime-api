import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>JHipster Entities will appear below</Text>
      <RoundedButton text="Product" onPress={() => navigation.navigate('Product')} testID="productEntityScreenButton" />
      <RoundedButton
        text="ProductCategory"
        onPress={() => navigation.navigate('ProductCategory')}
        testID="productCategoryEntityScreenButton"
      />
      <RoundedButton text="Shop" onPress={() => navigation.navigate('Shop')} testID="shopEntityScreenButton" />
      <RoundedButton
        text="CustomerDetails"
        onPress={() => navigation.navigate('CustomerDetails')}
        testID="customerDetailsEntityScreenButton"
      />
      <RoundedButton text="ShoppingCart" onPress={() => navigation.navigate('ShoppingCart')} testID="shoppingCartEntityScreenButton" />
      <RoundedButton text="ProductOrder" onPress={() => navigation.navigate('ProductOrder')} testID="productOrderEntityScreenButton" />
      <RoundedButton text="OrderItem" onPress={() => navigation.navigate('OrderItem')} testID="orderItemEntityScreenButton" />
      <RoundedButton text="Rider" onPress={() => navigation.navigate('Rider')} testID="riderEntityScreenButton" />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
