import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Card, EmptyState, FAB } from '../../components/ui';
import { colors, spacing } from '../../theme';
import { formatCurrency } from '../../utils/format';

/*
 * PRODUCTS FEATURE  --  Owner: Xavier
 * ---------------------------------------------------------------
 * Already working: the list (Read).
 * TODO (owner):
 *  [ ] Create  - FAB opens ProductForm; save with addProduct(...)
 *  [ ] Update  - tap a card -> ProductForm with { productId }; updateProduct(id, {...})
 *  [ ] Delete  - delete button + Alert.alert confirmation; deleteProduct(id)
 *  [ ] Toggle "available" with a Switch (updateProduct(id, { available }))
 *  [ ] Search box + category filter chips
 *  [ ] Show an empty state when there are no products (component is ready)
 */
export default function ProductsScreen({ navigation }) {
  const { products } = useApp();

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState title="No products yet" message="Tap + to add your first item." />
        }
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate('ProductForm', { productId: item.id })}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.category}</Text>
            </View>
            <Text style={styles.price}>{formatCurrency(item.price)}</Text>
          </Card>
        )}
      />
      <FAB label="Add product" onPress={() => navigation.navigate('ProductForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  list: { padding: spacing.md, paddingBottom: 96, gap: spacing.sm },
  card: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  meta: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  price: { fontSize: 16, fontWeight: '700', color: colors.espresso },
});
