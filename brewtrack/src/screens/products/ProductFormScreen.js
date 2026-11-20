import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { PrimaryButton } from '../../components/ui';
import { colors, spacing } from '../../theme';

/*
 * PRODUCTS FEATURE  --  Owner: Xavier
 * Add / edit form. Receives optional route.params.productId (edit mode).
 *
 * TODO (owner):
 *  [ ] Inputs: name, price (decimal-pad), category (use PRODUCT_CATEGORIES from constants.js)
 *  [ ] Validate: name required, price > 0, show friendly error text
 *  [ ] Save -> addProduct(data) or updateProduct(id, data), then navigation.goBack()
 *  [ ] Delete button (edit mode only) with confirmation
 */
export default function ProductFormScreen({ navigation, route }) {
  const { products } = useApp();
  const productId = route.params?.productId;
  const existing = products.find((p) => p.id === productId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{existing ? `Edit: ${existing.name}` : 'New product'}</Text>
      <Text style={styles.todo}>TODO: build the product form here.</Text>
      <PrimaryButton title="Back" variant="secondary" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, gap: spacing.md, backgroundColor: colors.cream },
  title: { fontSize: 20, fontWeight: '700', color: colors.espresso },
  todo: { color: colors.textMuted },
});
