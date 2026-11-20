import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { PrimaryButton } from '../../components/ui';
import { colors, spacing } from '../../theme';

/*
 * ORDERS FEATURE  --  Owner: Qian
 * "New order" screen. This is the screen that replaces the paper ticket,
 * so keep it fast: ideally two taps per item.
 *
 * TODO (owner):
 *  [ ] Product list (only `available` ones), grouped by category, with +/- steppers
 *  [ ] Sticky footer: running total (calcTotal from utils/format.js) + "Place order"
 *  [ ] Optional note field (e.g. "oat milk")
 *  [ ] Block placing an empty order
 *  [ ] On save: addOrder({ items, note }) then navigation.goBack()
 *      items look like { productId, name, price, qty }
 */
export default function OrderFormScreen({ navigation }) {
  const { products } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New order</Text>
      <Text style={styles.todo}>TODO: build the order form here. ({products.length} products available to pick from.)</Text>
      <PrimaryButton title="Back" variant="secondary" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, gap: spacing.md, backgroundColor: colors.cream },
  title: { fontSize: 20, fontWeight: '700', color: colors.espresso },
  todo: { color: colors.textMuted },
});
