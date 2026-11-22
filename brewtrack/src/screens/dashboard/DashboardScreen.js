import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, StatusPill } from '../../components/ui';
import { ORDER_STATUSES } from '../../constants';
import { useApp } from '../../context/AppContext';
import { colors, radius, spacing } from '../../theme';
import { formatCurrency } from '../../utils/format';
import { getDashboardStats } from '../../utils/stats';

const periods = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: '7 Days' },
  { value: 'all', label: 'All' },
];

export default function DashboardScreen() {
  const { orders } = useApp();
  const [period, setPeriod] = useState('all');
  const { totalOrders, revenue, averageOrderValue, statusCounts, bestsellers } =
    getDashboardStats(orders, period);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.filters} accessibilityLabel="Order date range">
        {periods.map(({ value, label }) => {
          const selected = value === period;
          return (
            <Pressable
              key={value}
              onPress={() => setPeriod(value)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={[styles.filter, selected && styles.selectedFilter]}
            >
              <Text style={[styles.filterLabel, selected && styles.selectedLabel]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Card style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Total orders</Text>
          <Text style={styles.value}>{totalOrders}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Revenue</Text>
          <Text style={styles.value}>{formatCurrency(revenue)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Average order value</Text>
          <Text style={styles.value}>{formatCurrency(averageOrderValue)}</Text>
        </View>
        <Text style={styles.hint}>Revenue and average order value use completed orders.</Text>
      </Card>

      <Card style={styles.section}>
        <Text accessibilityRole="header" style={styles.heading}>Orders by status</Text>
        {ORDER_STATUSES.map((status) => (
          <View key={status} style={styles.row}>
            <StatusPill status={status} />
            <Text style={styles.value}>{statusCounts[status]}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.section}>
        <Text accessibilityRole="header" style={styles.heading}>Bestsellers</Text>
        {bestsellers.length === 0 && (
          <Text style={styles.hint}>
            {totalOrders === 0 ? 'No orders in this date range.' : 'No completed sales in this date range.'}
          </Text>
        )}
        {bestsellers.map(([name, quantity]) => (
          <View key={name} style={styles.bestseller}>
            <View style={styles.row}>
              <Text style={styles.label}>{name}</Text>
              <Text style={styles.value}>{quantity} sold</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.bar, { width: `${quantity / bestsellers[0][1] * 100}%` }]} />
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.md, gap: spacing.md },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  filter: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.foam,
  },
  selectedFilter: { backgroundColor: colors.espresso, borderColor: colors.espresso },
  filterLabel: { color: colors.espresso, fontWeight: '600' },
  selectedLabel: { color: colors.foam },
  section: { gap: spacing.md },
  heading: { color: colors.espresso, fontSize: 18, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  label: { flexShrink: 1, color: colors.text, fontSize: 15 },
  value: { color: colors.espresso, fontSize: 16, fontWeight: '700' },
  hint: { color: colors.roast, fontSize: 13 },
  bestseller: { gap: spacing.xs },
  barTrack: { height: spacing.sm, borderRadius: radius.pill, backgroundColor: colors.border, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.caramel },
});
