import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Card, EmptyState, FAB, StatusPill } from '../../components/ui';
import { colors, spacing } from '../../theme';
import { formatCurrency, formatDateTime } from '../../utils/format';

/*
 * ORDERS FEATURE  --  Owner: Qian
 * ---------------------------------------------------------------
 * Already working: the list (Read).
 * TODO (owner):
 *  [ ] Create  - FAB opens OrderForm (pick products, quantities, note) -> addOrder({ items, note })
 *  [ ] Update  - tap the status pill / a button to advance New -> Preparing -> Ready -> Completed
 *                (ORDER_STATUSES in constants.js, updateOrderStatus(id, status))
 *  [ ] Delete  - delete with Alert.alert confirmation; deleteOrder(id)
 *  [ ] Status filter chips at the top (All / New / Preparing / Ready / Completed)
 *  [ ] Order detail (expand card or new screen) showing every item
 */
export default function OrdersScreen({ navigation }) {
  const { orders } = useApp();

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState icon="receipt-outline" title="No orders yet" message="Tap + to take the first order." />
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.row}>
              <StatusPill status={item.status} />
              <Text style={styles.total}>{formatCurrency(item.total)}</Text>
            </View>
            <Text style={styles.items}>
              {item.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
            </Text>
            <Text style={styles.time}>{formatDateTime(item.createdAt)}</Text>
          </Card>
        )}
      />
      <FAB label="New order" onPress={() => navigation.navigate('OrderForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  list: { padding: spacing.md, paddingBottom: 96, gap: spacing.sm },
  card: { gap: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  total: { fontSize: 18, fontWeight: '700', color: colors.espresso },
  items: { fontSize: 15, color: colors.text },
  time: { fontSize: 12, color: colors.textMuted },
});
