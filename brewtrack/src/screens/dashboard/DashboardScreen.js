import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui';
import { colors, spacing } from '../../theme';
import { formatCurrency } from '../../utils/format';

/*
 * DASHBOARD FEATURE  --  Owner: Sunudji
 * ---------------------------------------------------------------
 * Already working: one sample tile (total orders) so you can see the pattern.
 * Everything is computed from `orders` -- no extra storage needed.
 *
 * TODO (owner):
 *  [ ] Total revenue tile (decide: count Completed orders only, or all? document it in README)
 *  [ ] Average order value tile
 *  [ ] Top 5 bestsellers: sum `qty` per item name across orders, sort desc, show as bars
 *  [ ] Date filter chips: Today / 7 Days / All  (filter orders by createdAt)
 *  [ ] Orders-by-status breakdown
 *  [ ] Put the calculations in src/utils/stats.js so they're easy to explain/test
 */
export default function DashboardScreen() {
  const { orders } = useApp();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.tiles}>
        <Card style={styles.tile}>
          <Text style={styles.tileLabel}>Total orders</Text>
          <Text style={styles.tileValue}>{orders.length}</Text>
        </Card>
        <Card style={styles.tile}>
          <Text style={styles.tileLabel}>Revenue</Text>
          <Text style={styles.tileValue}>
            {formatCurrency(orders.reduce((s, o) => s + o.total, 0))}
          </Text>
          <Text style={styles.tileHint}>placeholder: all orders</Text>
        </Card>
      </View>
      <Text style={styles.todo}>TODO: bestsellers, date filter, average order value.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.md, gap: spacing.md },
  tiles: { flexDirection: 'row', gap: spacing.sm },
  tile: { flex: 1 },
  tileLabel: { fontSize: 13, color: colors.textMuted },
  tileValue: { fontSize: 26, fontWeight: '800', color: colors.espresso, marginTop: spacing.xs },
  tileHint: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  todo: { color: colors.textMuted },
});
