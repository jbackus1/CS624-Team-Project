
import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';

import { useApp } from '../../context/AppContext';
import { Card, PrimaryButton } from '../../components/ui';
import { PRODUCT_CATEGORIES } from '../../constants';
import { colors, spacing, radius } from '../../theme';
import { calcTotal, formatCurrency } from '../../utils/format';

/*
 * ORDERS FEATURE -- Owner: Qian
 * Create a new order by selecting available products,
 * adjusting quantities, adding notes, and saving the order.
 */

export default function OrderFormScreen({ navigation }) {
  const { products, addOrder } = useApp();

  const [quantities, setQuantities] = useState({});
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  // Show available products only.
  const availableProducts = useMemo(
    () => products.filter((product) => product.available),
    [products]
  );

  // Increase or decrease the selected quantity.
  const changeQuantity = (productId, change) => {
    setQuantities((previous) => ({
      ...previous,
      [productId]: Math.max(
        0,
        (previous[productId] || 0) + change
      ),
    }));
  };

  // Build the order items using product snapshots.
  const selectedItems = useMemo(
    () =>
      availableProducts
        .filter((product) => (quantities[product.id] || 0) > 0)
        .map((product) => ({
          productId: product.id,
          name: product.name,
          price: product.price,
          qty: quantities[product.id],
        })),
    [availableProducts, quantities]
  );

  const total = useMemo(
    () => calcTotal(selectedItems),
    [selectedItems]
  );

  const itemCount = selectedItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const placeOrder = () => {
    if (saving || selectedItems.length === 0) {
      if (!saving) {
        Alert.alert(
          'Empty order',
          'Please select at least one product.'
        );
      }
      return;
    }

    setSaving(true);

    try {
      addOrder({
        items: selectedItems,
        note: note.trim(),
      });

      navigation.goBack();
    } catch (error) {
      setSaving(false);
      Alert.alert(
        'Error',
        'Unable to create the order. Please try again.'
      );
    }
  };

  const categories = PRODUCT_CATEGORIES.filter((category) =>
    availableProducts.some(
      (product) => product.category === category
    )
  );

  const otherCategories = [
    ...new Set(
      availableProducts
        .map((product) => product.category)
        .filter((category) => !PRODUCT_CATEGORIES.includes(category))
    ),
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create New Order</Text>
        <Text style={styles.subtitle}>
          Choose products and adjust their quantities.
        </Text>

        {[...categories, ...otherCategories].map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>
              {category}
            </Text>

            {availableProducts
              .filter((product) => product.category === category)
              .map((product) => {
                const quantity = quantities[product.id] || 0;

                return (
                  <Card key={product.id} style={styles.productCard}>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>
                        {product.name}
                      </Text>
                      <Text style={styles.productPrice}>
                        {formatCurrency(product.price)}
                      </Text>
                    </View>

                    <View style={styles.quantityControls}>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Remove one ${product.name}`}
                        onPress={() =>
                          changeQuantity(product.id, -1)
                        }
                        disabled={quantity === 0}
                        style={[
                          styles.quantityButton,
                          quantity === 0 && styles.disabledButton,
                        ]}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </Pressable>

                      <Text style={styles.quantityText}>
                        {quantity}
                      </Text>

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Add one ${product.name}`}
                        onPress={() =>
                          changeQuantity(product.id, 1)
                        }
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </Pressable>
                    </View>
                  </Card>
                );
              })}
          </View>
        ))}

        {availableProducts.length === 0 && (
          <Text style={styles.emptyMessage}>
            No available products. Please add products
            in the Products tab first.
          </Text>
        )}

        <Text style={styles.categoryTitle}>Order Notes</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Example: Oat milk, less sugar..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={note}
          onChangeText={setNote}
          maxLength={250}
        />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            {itemCount} item(s)
          </Text>
          <Text style={styles.total}>
            Total: {formatCurrency(total)}
          </Text>
        </View>

        <PrimaryButton
          title={saving ? 'Saving...' : 'Place Order'}
          onPress={placeOrder}
          disabled={saving || selectedItems.length === 0}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.espresso,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  categorySection: {
    marginBottom: spacing.lg,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.espresso,
    marginBottom: spacing.sm,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  productInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  productPrice: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.caramel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.35,
  },
  quantityButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.espresso,
    minWidth: 22,
    textAlign: 'center',
  },
  noteInput: {
    backgroundColor: colors.foam,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    minHeight: 85,
    padding: spacing.md,
    color: colors.text,
    textAlignVertical: 'top',
  },
  emptyMessage: {
    color: colors.textMuted,
    textAlign: 'center',
    marginVertical: spacing.xl,
  },
  footer: {
    backgroundColor: colors.foam,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  total: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.espresso,
  },
});
