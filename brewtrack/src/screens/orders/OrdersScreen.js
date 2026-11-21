
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useApp } from '../../context/AppContext';
import {
  Card,
  EmptyState,
  FAB,
  StatusPill,
  PrimaryButton,
} from '../../components/ui';
import { ORDER_STATUSES } from '../../constants';
import { colors, spacing, radius } from '../../theme';
import {
  formatCurrency,
  formatDateTime,
} from '../../utils/format';

/*
 * ORDERS FEATURE -- Owner: Qian
 *
 * Features:
 * - View all orders
 * - Filter orders by status
 * - Expand an order to view details and notes
 * - Advance order status
 * - Delete an order with confirmation
 * - Navigate to the New Order form
 */

const FILTERS = ['All', ...ORDER_STATUSES];

export default function OrdersScreen({ navigation }) {
  const {
    orders,
    updateOrderStatus,
    deleteOrder,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Filter orders by status.
  const filteredOrders = useMemo(() => {
    if (activeFilter === 'All') {
      return orders;
    }

    return orders.filter(
      (order) => order.status === activeFilter
    );
  }, [orders, activeFilter]);

  // Advance an order to its next status.
  const advanceStatus = (order) => {
    const currentIndex = ORDER_STATUSES.indexOf(order.status);

    if (
      currentIndex < 0 ||
      currentIndex >= ORDER_STATUSES.length - 1
    ) {
      return;
    }

    const nextStatus = ORDER_STATUSES[currentIndex + 1];

    updateOrderStatus(order.id, nextStatus);
  };

  // Confirm before deleting an order.
  const confirmDelete = (order) => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteOrder(order.id);

            if (expandedOrderId === order.id) {
              setExpandedOrderId(null);
            }
          },
        },
      ]
    );
  };

  const renderOrder = ({ item }) => {
    const expanded = expandedOrderId === item.id;
    const currentIndex = ORDER_STATUSES.indexOf(item.status);

    const hasNextStatus =
      currentIndex >= 0 &&
      currentIndex < ORDER_STATUSES.length - 1;

    const nextStatus = hasNextStatus
      ? ORDER_STATUSES[currentIndex + 1]
      : null;

    return (
      <Card style={styles.card}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View order details"
          onPress={() =>
            setExpandedOrderId(expanded ? null : item.id)
          }
        >
          <View style={styles.headerRow}>
            <StatusPill status={item.status} />

            <Text style={styles.total}>
              {formatCurrency(item.total)}
            </Text>
          </View>

          <Text style={styles.itemsSummary}>
            {item.items
              .map((product) =>
                `${product.qty}× ${product.name}`
              )
              .join(', ')}
          </Text>

          <View style={styles.bottomRow}>
            <Text style={styles.time}>
              {formatDateTime(item.createdAt)}
            </Text>

            <Text style={styles.detailsLink}>
              {expanded ? 'Hide details ▲' : 'View details ▼'}
            </Text>
          </View>
        </Pressable>

        {expanded && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              Order Details
            </Text>

            {item.items.map((product, index) => (
              <View
                key={`${product.productId}-${index}`}
                style={styles.detailRow}
              >
                <View style={styles.detailInfo}>
                  <Text style={styles.detailName}>
                    {product.name}
                  </Text>

                  <Text style={styles.detailPrice}>
                    {product.qty} × {formatCurrency(product.price)}
                  </Text>
                </View>

                <Text style={styles.detailSubtotal}>
                  {formatCurrency(
                    product.price * product.qty
                  )}
                </Text>
              </View>
            ))}

            <View style={styles.detailTotalRow}>
              <Text style={styles.detailTotalText}>
                Order Total
              </Text>

              <Text style={styles.detailTotalText}>
                {formatCurrency(item.total)}
              </Text>
            </View>

            <Text style={styles.noteLabel}>
              Order Notes
            </Text>

            <Text style={styles.noteText}>
              {item.note?.trim() || 'No notes'}
            </Text>

            {hasNextStatus && (
              <PrimaryButton
                title={`Mark as ${nextStatus}`}
                onPress={() => advanceStatus(item)}
                style={styles.actionButton}
              />
            )}

            {item.status === 'Completed' && (
              <Text style={styles.completedText}>
                This order is completed.
              </Text>
            )}

            <PrimaryButton
              title="Delete Order"
              variant="danger"
              onPress={() => confirmDelete(item)}
              style={styles.actionButton}
            />
          </View>
        )}
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {FILTERS.map((filter) => {
            const selected = activeFilter === filter;

            return (
              <Pressable
                key={filter}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => {
                  setActiveFilter(filter);
                  setExpandedOrderId(null);
                }}
                style={[
                  styles.filterChip,
                  selected && styles.activeFilterChip,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    selected && styles.activeFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(order) => order.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
        extraData={expandedOrderId}
        ListEmptyComponent={
          <EmptyState
            icon="receipt-outline"
            title="No Orders Found"
            message={
              activeFilter === 'All'
                ? 'Tap + to create your first order.'
                : `No orders with status "${activeFilter}".`
            }
          />
        }
      />

      <FAB
        label="New order"
        onPress={() => navigation.navigate('OrderForm')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  filterContainer: {
    backgroundColor: colors.foam,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContent: {
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilterChip: {
    backgroundColor: colors.caramel,
    borderColor: colors.caramel,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.espresso,
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  list: {
    padding: spacing.md,
    paddingBottom: 100,
    gap: spacing.sm,
    flexGrow: 1,
  },
  card: {
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.espresso,
  },
  itemsSummary: {
    fontSize: 15,
    color: colors.text,
    marginTop: spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  time: {
    fontSize: 12,
    color: colors.textMuted,
  },
  detailsLink: {
    fontSize: 12,
    color: colors.caramel,
    fontWeight: '700',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  detailsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.espresso,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  detailInfo: {
    flex: 1,
  },
  detailName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  detailPrice: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  detailSubtotal: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.espresso,
  },
  detailTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.sm,
  },
  detailTotalText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.espresso,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.espresso,
    marginTop: spacing.sm,
  },
  noteText: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  actionButton: {
    marginTop: spacing.sm,
  },
  completedText: {
    fontSize: 14,
    color: colors.success,
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: spacing.sm,
  },
});
